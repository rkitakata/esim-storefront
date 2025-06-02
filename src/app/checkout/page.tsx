'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { Text, Button, Box, Space } from '@mantine/core';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    router.push('/thank-you');
    clearCart();
  };

  return (
    <>
      <Text fw={700}>Checkout</Text>
      <Space h="lg" />
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 py-4 space-4">
              <Text fw={500}>{item.name}</Text>
              <Text>Price: ${item.price.toFixed(2)}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
            </Box>
          ))}

          <Space h="lg" />
          <div className="flex flex-col items-end gap-2 mt-auto">
            <Text fw={700} size="lg">
              Total: ${total.toFixed(2)}
            </Text>
            <Button className="mt-2" onClick={handlePayment}>
              Simulate Payment
            </Button>
          </div>
        </>
      )}
    </>
  );
}
