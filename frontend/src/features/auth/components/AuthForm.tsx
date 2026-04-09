'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type LoginInput,
  type RegisterInput,
  loginUserSchema,
  registerUserSchema,
} from '@repo/shared';
import Link from 'next/link';
import { FormField } from './FormField';
import { useState } from 'react';
import { Props, FormValues } from '../types/index';

const inputClass =
  'bg-[#0e141c] text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#acc7ff]';

export const AuthForm = ({ type, onSubmit, isLoading }: Props) => {
  const isRegister = type === 'register';

  const schema = isRegister ? registerUserSchema : loginUserSchema;
  const [backendError, setBackendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FormValues) => {
    setBackendError(null);
    try {
      if (type === 'login') {
        await onSubmit(data as LoginInput);
      } else {
        await onSubmit(data as RegisterInput);
      }
    } catch (err) {
      setBackendError(
        err instanceof Error ? err.message : 'Something went wrong',
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="form bg-[#121a25] p-6 rounded-2xl space-y-4 w-full"
    >
      <h2 className="text-3xl font-bold text-[#d9e6fd]">
        {isRegister ? 'Create Account' : 'Login'}
      </h2>

      {/* Username */}
      {isRegister && (
        <FormField label="Username" error={errors.username?.message}>
          <input
            {...register('username')}
            className={inputClass}
            placeholder="jonh_doe"
          />
        </FormField>
      )}

      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register('email')}
          className={inputClass}
          placeholder="john.doe@example.com"
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <input
          type="password"
          {...register('password')}
          className={inputClass}
          placeholder="••••••••"
        />
      </FormField>

      {!isRegister && (
        <p className="text-sm font-bold text-[#acc7ff]">
          <Link href="/reset">Forget Password?</Link>
        </p>
      )}

      <button
        disabled={isSubmitting || isLoading}
        className="w-full bg-[#acc7ff] font-semibold text-black py-2 rounded-md"
      >
        {isSubmitting || isLoading
          ? 'Loading...'
          : isRegister
            ? 'Register'
            : 'Login'}
      </button>

      {backendError && <p className="text-sm text-red-400">{backendError}</p>}

      <div className="form-footer">
        {isRegister ? (
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#acc7ff]">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[#acc7ff]">
              Register
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};
