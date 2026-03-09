import { useAuthContext } from '@/src/presentation/contexts/auth-context';

export function useAuth() {
  return useAuthContext();
}
