import { useMutation } from '@tanstack/react-query'

import { verifyEmail } from '../api/auth.api'

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: verifyEmail,
  })
