import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '../api/auth.api'

export const useForgotPassword = () =>
  useMutation({
    mutationFn: forgotPassword,
  })
