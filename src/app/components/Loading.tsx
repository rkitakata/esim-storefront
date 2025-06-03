'use client';
import React from 'react';
import { Loader, Center } from '@mantine/core';

const Loading: React.FC = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Loader size="lg" color="blue" />
    </Center>
  );
};

export default Loading;
