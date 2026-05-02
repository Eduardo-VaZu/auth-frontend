import { useState } from 'react'

import { createQueryClient } from '@/shared/lib/queryClient'

import { createAppRouter } from '../router'
import { QueryProvider } from './QueryProvider'
import { AppRouterProvider } from './RouterProvider'

export const AppProviders = (): JSX.Element => {
  const [queryClient] = useState(createQueryClient)
  const [router] = useState(() => createAppRouter(queryClient))

  return (
    <QueryProvider queryClient={queryClient}>
      <AppRouterProvider router={router} />
    </QueryProvider>
  )
}
