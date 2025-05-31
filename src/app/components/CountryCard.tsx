'use client';
import Link from 'next/link';
import { Card, Text } from '@mantine/core';

interface CountryCardProps {
  name: string;
}

export const CountryCard = ({ name }: CountryCardProps) => {
  return (
    <Card shadow="sm" padding="lg" className="cursor-pointer hover:shadow-lg">
      <Link href={`/country/${name.toLowerCase()}`}>
        <Text size="xl" className="text-center capitalize">
          {name}
        </Text>
      </Link>
    </Card>
  );
};
