import type { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

import { currentUserQueryOptions } from '@/features/auth/api/auth.api'
import { ROUTES } from '@/shared/constants/routes'

export interface RouterContext {
  queryClient: QueryClient
}

const resolveCurrentUser = async (queryClient: QueryClient) =>
  queryClient.ensureQueryData(currentUserQueryOptions())

export const requireAuth = async ({ context }: { context: RouterContext }): Promise<void> => {
  const user = await resolveCurrentUser(context.queryClient)

  if (user === null) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: ROUTES.login,
    })
  }
}

export const requireAdmin = async ({ context }: { context: RouterContext }): Promise<void> => {
  const user = await resolveCurrentUser(context.queryClient)

  if (user === null || user.role !== 'admin') {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: ROUTES.dashboard,
    })
  }
}

export const requireGuest = async ({ context }: { context: RouterContext }): Promise<void> => {
  const user = await resolveCurrentUser(context.queryClient)

  if (user !== null) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: ROUTES.dashboard,
    })
  }
}
