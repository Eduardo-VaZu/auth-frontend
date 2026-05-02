import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'La contraseña actual debe tener al menos 8 caracteres'),
    newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword'],
  })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
