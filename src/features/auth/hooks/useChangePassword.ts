import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys, changePassword } from '../api/auth.api'

export const useChangePassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.currentUser(), null)
      void queryClient.invalidateQueries({
        queryKey: authKeys.all,
      })
    },
  })
}
