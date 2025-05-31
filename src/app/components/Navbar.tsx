'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar } from '@mantine/core';

export const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/">eSIM Storefront</Link>
      <div className="space-x-4">
        {user ? (
          <div className="flex items-center">
            {/* <Avatar src={user.photoURL} className="w-8 h-8" /> */}
            <span>{user.displayName}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={login} size="sm">
            Login with Google
          </Button>
        )}
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
};
