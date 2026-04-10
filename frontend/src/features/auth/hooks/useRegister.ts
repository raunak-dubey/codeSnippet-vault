import { useMutation } from '@tanstack/react-query';
import { setAccessToken } from '@/shared/lib/api';
import { register } from '../api/auth.api';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: register,

    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      void router.replace('/verify-email');
    },
  });
};
