import { AuthToken } from './types';

export const validateCredentials = (username: string, password: string): boolean => {
  return username === 'admin' && password === 'password';
};

export const createToken = (username: string): string => {
  const payload: AuthToken = {
    username,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  };
  return btoa(JSON.stringify(payload));
};

export const verifyToken = (token: string): AuthToken | null => {
  try {
    const decoded = JSON.parse(atob(token)) as AuthToken;
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};