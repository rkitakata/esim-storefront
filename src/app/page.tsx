'use client';
import React from 'react';
import { CountryCard } from './components/CountryCard';
import { Text, Space } from '@mantine/core';
const countries = ['Japan', 'Korea', 'China', 'Taiwan', 'America'];

export default function HomePage() {
  return (
    <div>
      <Text fw={700} size="xl">
        Select a country
      </Text>
      <Space h="lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryCard key={country} name={country} />
        ))}
      </div>
    </div>
  );
}
