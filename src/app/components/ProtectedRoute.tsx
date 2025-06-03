'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  excludePaths?: string[]; // Paths that don't require authentication
}

export function ProtectedRoute({ children, excludePaths = ['/'] }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if current path should be excluded from protection
  const isExcluded = excludePaths.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isExcluded) {
      router.push('/');
    }
  }, [user, loading, router, isExcluded]);

  if (loading && !isExcluded) {
    return <Loading />;
  }

  if (!user && !isExcluded) {
    return null; // Don't render while redirecting
  }

  return <>{children}</>;
}
