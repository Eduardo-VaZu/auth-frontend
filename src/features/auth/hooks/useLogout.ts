import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys, logout } from '../api/auth.api'

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.setQueryData(authKeys.currentUser(), null)
      void queryClient.invalidateQueries({
        queryKey: authKeys.all,
      })
    },
  })
}
