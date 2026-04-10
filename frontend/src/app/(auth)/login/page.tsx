'use client';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { LoginInput } from '@repo/shared';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const { mutateAsync, isPending } = useLogin();
  const handleLogin = async (data: LoginInput) => {
    await mutateAsync(data);
  };

  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        {verified && (
          <div className="text-center text-xl text-[#acc7ff]">
            <p>Email verified successfully.</p>
            <p>You can now login.</p>
          </div>
        )}
        {error === 'invalid_token' && (
          <div className="text-center text-xl text-red-400">
            <p>Invalid or missing verification link.</p>
            <p>Please try again.</p>
          </div>
        )}
        {error === 'verification_failed' && (
          <div className="text-center text-xl text-red-400">
            <p>Verification failed or link expired.</p>
            <p>Please try again.</p>
          </div>
        )}
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isPending} />
      </div>
    </div>
  );
}
