'use client';
import { Plan } from '../types/plan';
import { useCart } from '../context/CartContext';
import { Card, Text, Button } from '@mantine/core';

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card shadow="sm" padding="lg" className="border ">
      <div className="flex flex-col items-center justify-center p-4">
        <Text fw={500}>{plan.name}</Text>
        <Text>
          Data: {plan.dataVolume} {plan.dataUnit}
        </Text>
        <Text>Duration: {plan.validityDays} days</Text>
        <Text>Price: ${plan.price.toFixed(2)}</Text>
        <Text>{plan.description}</Text>
        <Button className="mt-2 border-1 border-gray-200" onClick={() => addToCart(plan)}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
