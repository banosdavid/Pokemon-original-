'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-gray-500 hover:text-gray-700"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}