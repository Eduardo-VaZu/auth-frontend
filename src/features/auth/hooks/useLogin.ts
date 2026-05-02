import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys, login } from '../api/auth.api'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.currentUser(), response.user)
    },
  })
}
