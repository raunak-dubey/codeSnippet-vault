import { useMutation } from '@tanstack/react-query';
import { setAccessToken } from '@/shared/lib/api';
import { register } from '../services/auth.api';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: register,

    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      void router.replace('/');
    },
  });
};
