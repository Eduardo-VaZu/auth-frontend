import { useQuery } from '@tanstack/react-query'

import { currentUserQueryOptions } from '../api/auth.api'

export const useCurrentUser = () => useQuery(currentUserQueryOptions())
