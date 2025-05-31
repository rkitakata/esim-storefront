import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';

export const metadata = {
  title: 'eSIM Storefront',
  description: 'Browse and buy eSIM plans',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="container mx-auto p-4">{children}</main>
            </CartProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
