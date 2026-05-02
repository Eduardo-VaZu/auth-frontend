import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Ingresa un correo electronico valido'),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
