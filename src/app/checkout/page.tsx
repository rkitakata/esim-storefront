'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { Text, Button, Card } from '@mantine/core';
import { useProtectedRoute } from '../hooks/useProtectedRoute';

export default function CheckoutPage() {
  useProtectedRoute();
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    clearCart();
    router.push('/thank-you');
  };

  return (
    <>
      <Text fw={500} className="mb-4">
        Checkout
      </Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id} shadow="sm" padding="lg">
                <Text fw={500}>{item.name}</Text>
                <Text>Price: ${item.price.toFixed(2)}</Text>
              </Card>
            ))}
          </div>
          <Text fw={500} className="mt-4">
            Total: ${total.toFixed(2)}
          </Text>
          <Button className="mt-2" onClick={handlePayment}>
            Simulate Payment
          </Button>
        </>
      )}
    </>
  );
}
