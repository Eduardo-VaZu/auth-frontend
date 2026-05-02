import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().trim().email('Ingresa un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

export type RegisterSchema = z.infer<typeof registerSchema>
