'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken, AuthToken } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthToken | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem('auth_token');
        router.push('/login');
      }
    }
    setLoading(false);
  }, [router]);

  return { user, loading };
}