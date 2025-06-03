'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../context/AuthContext';
import { PlanCard } from '../../components/PlanCard';
import { Box, Text } from '@mantine/core';

import { ApiResponse, Plan } from '@/app/types/plan';
import Loading from '@/app/components/Loading';

export default function CountryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = React.use(params);

  const { loading } = useAuth();

  const [perDayPlans, setPerDayPlans] = useState<Plan[]>([]);
  const [fixedDayPlans, setFixedDayPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string>('');
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          `https://esim.gmobile.biz/api/v1/plans?country=${resolvedParams.name}`
        );

        const allPlans = res.data.data.plans;
        setPerDayPlans(allPlans.PER_DAY);
        setFixedDayPlans(allPlans.FIXED_DAY);
      } catch (error) {
        setError('Failed to load plans');
        console.error('Error loading plans:', error);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, [resolvedParams.name]);

  if (loading || loadingPlans) {
    return <Loading />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <>
      <Text fw={700} size="xl" className="capitalize">
        {resolvedParams.name}
      </Text>

      <Box className="my-4">
        <Text fw={700} size="xl" className="mb-2">
          Unlimited Per-Day Plans
        </Text>
      </Box>
      {perDayPlans.length === 0 ? (
        <Text>No per-day plans available.</Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {perDayPlans.map((plan, index) => (
            <PlanCard key={`${plan.id}-${index}`} plan={plan} />
          ))}
        </div>
      )}
      <Box className="my-6">
        <Text fw={700} size="xl" className="mb-2">
          Fixed Data Plans
        </Text>
      </Box>
      {fixedDayPlans.length === 0 ? (
        <Text>No fixed-day plans available.</Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fixedDayPlans.map((plan) => (
            <PlanCard key={plan.id.toString()} plan={plan} />
          ))}
        </div>
      )}
    </>
  );
}
