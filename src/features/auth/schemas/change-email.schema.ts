import { z } from 'zod'

export const changeEmailSchema = z.object({
  email: z.string().trim().email('Ingresa un correo electronico valido'),
})

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
