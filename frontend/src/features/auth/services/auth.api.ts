import api from '@/shared/lib/api';
import { LoginInput, RegisterInput } from '@repo/shared';

type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
  };
};

type MeResponse = {
  success: boolean;
  data: {
    userId: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
  };
};

export const login = async (data: LoginInput) => {
  const res = await api.post<AuthResponse>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterInput) => {
  const res = await api.post<AuthResponse>('/auth/register', data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<MeResponse>('/auth/me');
  return res.data;
};
