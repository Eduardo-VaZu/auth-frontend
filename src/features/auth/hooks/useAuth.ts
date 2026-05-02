import type { AuthStatus, AuthenticatedUser } from '../types/auth.types'
import { useCurrentUser } from './useCurrentUser'

export interface UseAuthResult {
  isLoading: boolean
  status: AuthStatus
  user: AuthenticatedUser | null
}

export const useAuth = (): UseAuthResult => {
  const currentUserQuery = useCurrentUser()
  const user = currentUserQuery.data ?? null

  if (currentUserQuery.isPending) {
    return {
      isLoading: true,
      status: 'loading',
      user: null,
    }
  }

  return {
    isLoading: false,
    status: user === null ? 'guest' : 'authenticated',
    user,
  }
}
