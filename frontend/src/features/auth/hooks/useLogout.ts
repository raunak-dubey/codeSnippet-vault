import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/auth.api';
import { setAccessToken } from '@/shared/lib/api';
import { queryKeys } from '@/shared/lib/queryKeys';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      setAccessToken(null);
      queryClient.removeQueries({
        queryKey: queryKeys.auth.me,
      });

      void router.replace('/login');
    },
  });
};
