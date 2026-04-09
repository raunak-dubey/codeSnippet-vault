'use client';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { LoginInput } from '@repo/shared';

export default function Login() {
  const { mutateAsync, isPending } = useLogin();

  const handleLogin = async (data: LoginInput) => {
    await mutateAsync(data);
  };

  return <AuthForm type="login" onSubmit={handleLogin} isLoading={isPending} />;
}
