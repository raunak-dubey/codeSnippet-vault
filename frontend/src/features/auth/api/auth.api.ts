import api from '@/shared/lib/api';
import { LoginInput, RegisterInput } from '@repo/shared';
import { AuthResponse, MeResponse, LogoutResponse } from '../types/index';

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

export const logout = async () => {
  const res = await api.post<LogoutResponse>('/auth/logout');
  return res.data;
};
