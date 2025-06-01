'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Button, Menu } from '@mantine/core';
import Image from 'next/image';

export const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 ">
      <Link className="text-2xl font-bold bg-red-500 px-4 py-2 rounded-md" href="/">
        eSIM Storefront
      </Link>
      <div className="space-x-4 flex justify-center items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <Image
              src={user.photoURL || ''}
              alt="user"
              width={32}
              height={32}
              className="w-8 h-8 rounded-4xl"
            />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="outline">{user.displayName}</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Link
              className="text-blue-500 border-blue-500 border-1 rounded-md px-2 py-1"
              href="/cart">
              Cart
            </Link>
          </div>
        ) : (
          <Button className="text-blue-500" onClick={login}>
            Login with Google
          </Button>
        )}
      </div>
    </nav>
  );
};
