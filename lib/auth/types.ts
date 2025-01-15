export interface AuthToken {
  username: string;
  exp: number;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}