'use client';
import React from 'react';
import { CountryCard } from './components/CountryCard';

const countries = ['Japan', 'Korea', 'China', 'Taiwan', 'America'];

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {countries.map((country) => (
        <CountryCard key={country} name={country} />
      ))}
    </div>
  );
}
