import { queryKeys } from '@/shared/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/auth.api';

export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
  });
};
