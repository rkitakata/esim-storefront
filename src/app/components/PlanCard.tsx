'use client';
import { Plan } from '../country/[name]/page';
import { useCart } from '../context/CartContext';
import { Card, Text, Button } from '@mantine/core';

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card shadow="sm" padding="lg" className="border">
      <Text fw={500}>{plan.name}</Text>
      <Text>
        Data: {plan.dataVolume} {plan.dataUnit}
      </Text>
      <Text>Duration: {plan.validityDays} days</Text>
      <Text>Price: ${plan.price.toFixed(2)}</Text>
      <Button className="mt-2" onClick={() => addToCart(plan)}>
        Add to Cart
      </Button>
    </Card>
  );
};
