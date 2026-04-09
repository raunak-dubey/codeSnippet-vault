'use client';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { RegisterInput } from '@repo/shared';

export default function Register() {
  const { mutateAsync, isPending } = useRegister();

  const handleRegister = async (data: RegisterInput) => {
    await mutateAsync(data);
  };

  return (
    <AuthForm type="register" onSubmit={handleRegister} isLoading={isPending} />
  );
}
