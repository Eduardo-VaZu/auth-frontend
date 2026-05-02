import { z } from 'zod'

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1, 'El token es obligatorio'),
  newPassword: z
    .string()
    .min(8, 'La nueva contrasena debe tener al menos 8 caracteres'),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
