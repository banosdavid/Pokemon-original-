import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface AuthToken extends JwtPayload {
  username: string;
}

export const validateCredentials = (username: string, password: string) => {
  return username === 'admin' && password === 'password';
};

// Create a simple JWT-like token (for demo purposes)
export const createToken = (username: string) => {
  const payload = {
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