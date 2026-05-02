import {
  MutationCache,
  QueryCache,
  QueryClient,
  type DefaultOptions,
} from '@tanstack/react-query'

import { HttpError } from './httpError'

const defaultOptions: DefaultOptions = {
  queries: {
    gcTime: 5 * 60 * 1000,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof HttpError && [401, 403, 409, 422, 429].includes(error.status)) {
        return false
      }

      return failureCount < 2
    },
  },
  mutations: {
    retry: false,
  },
}

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions,
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  })
