import { useMutation, useQueryClient } from '@tanstack/react-query'

import { logoutAll } from '../api/auth.api'
import { authKeys } from '../api/auth.api'

export const useLogoutAll = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutAll,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.currentUser(), null)
      void queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}
