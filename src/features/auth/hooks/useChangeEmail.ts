import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys, changeEmail } from '../api/auth.api'

export const useChangeEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeEmail,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.currentUser(), null)
      void queryClient.invalidateQueries({
        queryKey: authKeys.all,
      })
    },
  })
}
