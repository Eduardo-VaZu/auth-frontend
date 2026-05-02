import { env } from '@/shared/lib/env'

export const buildSeoUrl = (path: string): string => new URL(path, env.siteUrl ?? window.location.origin).toString()
