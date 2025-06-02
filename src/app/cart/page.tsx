'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { Text, Button, Box, Space } from '@mantine/core';
import { CartItem } from '../types/plan';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Text fw={700}>Your Cart</Text>
      <Space h="lg" />
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map((item: CartItem, index: number) => (
            <Box
              key={`${item.id}-${index}`}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-4">
              <Text fw={500}>{item.name}</Text>
              <Text>Price: ${item.price.toFixed(2)}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>

              <Button variant="outline" onClick={() => removeFromCart(item.id.toString())}>
                Remove
              </Button>
            </Box>
          ))}
          <Space h="lg" />
          <div className="flex flex-col items-end gap-2 mt-auto">
            <Text fw={500} className="mt-4">
              Total: ${total.toFixed(2)}
            </Text>
            <Button className="mt-2" onClick={() => router.push('/checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
}
