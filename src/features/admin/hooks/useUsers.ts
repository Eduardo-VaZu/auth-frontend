import { useQuery } from '@tanstack/react-query'

import { usersQueryOptions } from '../api/admin.api'

export const useUsers = (page = 1, limit = 20, search?: string) =>
  useQuery(usersQueryOptions(page, limit, search))
