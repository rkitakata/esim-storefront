'use client';
import Link from 'next/link';
import { Card, Text } from '@mantine/core';

interface CountryCardProps {
  name: string;
}

export const CountryCard = ({ name }: CountryCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      className="cursor-pointer hover:shadow-lg border-1 border-gray-200">
      <Link href={`/country/${name.toLowerCase()}`}>
        <Text className="text-center capitalize">{name}</Text>
      </Link>
    </Card>
  );
};
