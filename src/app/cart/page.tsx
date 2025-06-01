'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Text, Button, Card } from '@mantine/core';
import { Plan } from '../types/plan';
import { useProtectedRoute } from '../hooks/useProtectedRoute';

export default function CartPage() {
  //   const { user, loading } = useAuth();
  const router = useRouter();
  const { cart, removeFromCart } = useCart();

  useProtectedRoute();

  const total = cart.reduce((acc: number, item: Plan) => acc + item.price, 0);

  return (
    <>
      <Text fw={500} className="mb-4">
        Your Cart
      </Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <div className="space-y-4">
          {cart.map((item: Plan) => (
            <Card
              key={item.id}
              shadow="sm"
              padding="lg"
              className="flex justify-between items-center">
              <Text fw={500}>{item.name}</Text>
              <Text>Price: ${item.price.toFixed(2)}</Text>

              <Button variant="outline" onClick={() => removeFromCart(item.id.toString())}>
                Remove
              </Button>
            </Card>
          ))}
          <Text fw={500} className="mt-4">
            Total: ${total.toFixed(2)}
          </Text>
          <Button className="mt-2" onClick={() => router.push('/checkout')}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </>
  );
}
