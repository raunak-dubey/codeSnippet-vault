'use client';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { register } from '@/features/auth/services/auth.api';
import { RegisterInput } from '@repo/shared';

export default function Register() {
  const handleRegister = async (data: RegisterInput) => {
    await register(data);
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
