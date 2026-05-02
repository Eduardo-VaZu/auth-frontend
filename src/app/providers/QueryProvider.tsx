import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
  queryClient: QueryClient
}

export const QueryProvider = ({
  children,
  queryClient,
}: QueryProviderProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
