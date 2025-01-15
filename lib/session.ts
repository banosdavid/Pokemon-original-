import { cookies } from 'next/headers';

export type SessionUser = {
  isAuthenticated: boolean;
  username?: string;
};

export async function getSession(): Promise<SessionUser> {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token');
  
  return {
    isAuthenticated: !!authToken,
    username: authToken ? 'admin' : undefined
  };
}