// pages/thank-you.tsx
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';

const ThankYouPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Thank You - eSIM Storefront</title>
        <meta name="description" content="Purchase confirmation" />
      </Head>

      <Container size="sm" className="py-20 text-center">
        <Stack align="center" gap="xl">
          <Title order={2} mb="md">
            Thank you! Your eSIM purchase has been simulated successfully.
          </Title>
          <Text color="dimmed" mb="xl">
            You can continue browsing or revisit your cart anytime.
          </Text>
          <Link href="/" passHref>
            <Button variant="outline" size="md" className="bg-yellow-500">
              Back to Home
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default ThankYouPage;
