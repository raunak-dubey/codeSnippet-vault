import api from '@/shared/lib/api';
import { LoginInput, RegisterInput } from '@repo/shared';

type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
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
