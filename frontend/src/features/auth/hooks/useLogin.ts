import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth.api';
import { setAccessToken } from '@/shared/lib/api';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,

    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      void router.replace('/');
    },
  });
};
