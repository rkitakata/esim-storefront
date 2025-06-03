import './globals.css';
import type { ReactNode } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

export const metadata = {
  title: 'eSIM Storefront',
  description: 'Browse and buy eSIM plans',
};

const theme = createTheme({});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <CartProvider>
              <ProtectedRoute excludePaths={['/']}>
                <Navbar />
                <main className="container mx-auto p-4">{children}</main>
              </ProtectedRoute>
            </CartProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
