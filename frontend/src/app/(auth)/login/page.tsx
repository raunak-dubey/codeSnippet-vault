'use client';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { login } from '@/features/auth/services/auth.api';
import { LoginInput } from '@repo/shared';

export default function Login() {
  const handleLogin = async (data: LoginInput) => {
    await login(data);
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
