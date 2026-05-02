import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys, revokeSession } from '../api/auth.api'

export const useRevokeSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: revokeSession,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: authKeys.sessions(),
      })
      void queryClient.invalidateQueries({
        queryKey: authKeys.currentUser(),
      })
    },
  })
}
