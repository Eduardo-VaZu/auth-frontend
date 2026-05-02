import { useQuery } from '@tanstack/react-query'

import { sessionsQueryOptions } from '../api/auth.api'

export const useSessions = () => useQuery(sessionsQueryOptions())
