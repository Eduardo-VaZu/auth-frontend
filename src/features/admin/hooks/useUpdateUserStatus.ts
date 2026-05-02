import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adminKeys, updateUserStatus } from '../api/admin.api'
import type { AdminManagedUserStatus } from '../types/admin.types'

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: AdminManagedUserStatus }) => updateUserStatus(userId, { status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminKeys.users() })
    },
  })
}
