'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { PlanCard } from '../../components/PlanCard';
import { Loader, Text } from '@mantine/core';

import { ApiResponse, Plan } from '@/app/types/plan';

export default function CountryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = React.use(params);
  const { user, loading } = useAuth();
  const router = useRouter();

  const [perDayPlans, setPerDayPlans] = useState<Plan[]>([]);
  const [fixedDayPlans, setFixedDayPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string>('');
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          `https://esim.gmobile.biz/api/v1/plans?country=${resolvedParams.name}`
        );

        // Drill into res.data.data.plans
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
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader color="white" size="lg" className="w-10 h-10" />
        <Text>Loading...</Text>
      </div>
    );
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <>
      <Text fw={700} className="mb-4 text-[50px] capitalize">
        {resolvedParams.name}
      </Text>

      <Text fw={700} className="mt-4 mb-2">
        Unlimited Per-Day Plans
      </Text>
      {perDayPlans.length === 0 ? (
        <Text>No per-day plans available.</Text>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {perDayPlans.map((plan) => (
            <PlanCard key={plan.id.toString()} plan={plan} />
          ))}
        </div>
      )}

      <Text fw={700} className="mt-6 mb-2">
        Fixed Data Plans
      </Text>
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
