import { z } from 'zod'

export const verifyEmailSchema = z.object({
  token: z.string().trim().min(1, 'El token es obligatorio'),
})

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
