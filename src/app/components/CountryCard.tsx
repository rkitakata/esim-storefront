'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, Text } from '@mantine/core';
import { useAuth } from '../context/AuthContext';
interface CountryCardProps {
  name: string;
}

export const CountryCard = ({ name }: CountryCardProps) => {
  const router = useRouter();
  const { user, login } = useAuth();

  const handleClick = () => {
    if (user) {
      router.push(`/country/${name.toLowerCase()}`);
    } else {
      router.push('/');
      localStorage.setItem('country', name);
      login();
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      className="cursor-pointer hover:shadow-lg border-1 border-gray-200">
      <Button variant="white" onClick={() => handleClick()}>
        <Text className="text-center capitalize">{name}</Text>
      </Button>
    </Card>
  );
};
