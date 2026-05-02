import { z } from 'zod'

const booleanFromStringSchema = z.enum(['true', 'false']).transform((value) => value === 'true')

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_NAME: z.string().min(1),
  VITE_ENABLE_DEVTOOLS: booleanFromStringSchema,
  VITE_SITE_URL: z.string().url().optional(),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('\n')

  throw new Error(`Invalid frontend environment configuration.\n${issues}`)
}

export const env = {
  apiUrl: parsedEnv.data.VITE_API_URL,
  appName: parsedEnv.data.VITE_APP_NAME,
  enableDevtools: parsedEnv.data.VITE_ENABLE_DEVTOOLS,
  siteUrl: parsedEnv.data.VITE_SITE_URL,
} as const
