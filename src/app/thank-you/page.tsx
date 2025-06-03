'use client';
import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const ThankYouPage: NextPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <Head>
        <title>Thank You - eSIM Storefront</title>
        <meta name="description" content="Purchase confirmation" />
      </Head>

      <Container className="py-20 text-center">
        <Stack align="center" gap="xl">
          <Title order={2} mb="md">
            Thank you! Your eSIM purchase has been simulated successfully.
          </Title>
          <Link href="/" passHref>
            <Button variant="outline" className="bg-yellow-500">
              Back to Home
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default ThankYouPage;
