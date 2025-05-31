'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { PlanCard } from '../../components/PlanCard';
import { Text } from '@mantine/core';

//
// Updated Plan interface to match the JSON structure:
//
export interface Plan {
  id: number;
  name: string;
  planId: string;
  price: number;
  dataId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  validityDays: number;
  dataVolume: string;
  dataUnit: string;
  validityDaysCycle: string;
  metadata: Record<string, unknown>;
  networkId: number;
  enabled: boolean;
  packageType: 'PER_DAY' | 'FIXED_DAY';
  countryId: number;
  serviceProviderId: number;
  prices: Record<string, number>;
  defaultCurrency: string;
  topupEnabled: boolean;
  network: {
    id: number;
    name: string;
    enabled: boolean;
    code: string;
    apn: string;
    qos: string;
    type: 'LOCAL' | 'ROAMING';
    networkGeneration: string;
    countryId: number;
    createdAt: string;
    updatedAt: string;
  };
  country: {
    name: string;
    enabled: boolean;
    subCountries: null; // or string[]
    code: string;
  };
  serviceProvider: {
    name: string;
    enabled: boolean;
  };
  plans_prices: Record<string, unknown> | null;
  provision_price: Record<string, unknown> | null;
  xe: {
    [currency: string]: number;
  };
}

interface ApiResponse {
  statusCode: number;
  data: {
    network: Array<unknown>;
    country: {
      name: string;
      enabled: boolean;
      subCountries: null;
      code: string;
    };
    plans: {
      PER_DAY: Plan[];
      FIXED_DAY: Plan[];
    };
  };
}

export default function CountryPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = React.use(params);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Instead of a flat array, the API now returns an object with two arrays:
  //    plans.PER_DAY   (all per-day plans)
  //    plans.FIXED_DAY (all fixed-day plans)
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
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <div>
      <Text size="2xl" fw={500} className="mb-4 capitalize">
        {resolvedParams.name}
      </Text>

      <Text size="xl" fw={500} className="mt-4 mb-2">
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

      <Text size="xl" fw={500} className="mt-6 mb-2">
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
    </div>
  );
}
