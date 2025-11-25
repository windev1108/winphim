
import { useQuery } from '@tanstack/react-query'
import { IAuthResponse } from './types';
import { validateAuth } from './requests';

export const useAuthQuery = () => {
  return useQuery<IAuthResponse>({
    queryKey: ['/auth'],
    queryFn: validateAuth,
  })
}
  ;