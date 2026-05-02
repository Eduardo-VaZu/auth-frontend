import { queryOptions } from '@tanstack/react-query'

import { del, get, patch, post } from '@/shared/lib/fetchClient'
import { HttpError } from '@/shared/lib/httpError'
import type { StatusMessageResponse } from '@/shared/types/api.types'

import type {
  AuthenticatedUser,
  AuthSessionsResponse,
  AuthSessionItem,
  AuthUserResponse,
  ChangeEmailInput,
  ChangePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '../types/auth.types'

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'current-user'] as const,
  sessions: () => [...authKeys.all, 'sessions'] as const,
}

let refreshPromise: Promise<void> | null = null

const isUnauthorizedError = (error: unknown): error is HttpError =>
  error instanceof HttpError && error.status === 401

const withSessionRecovery = async <TData>(
  executor: () => Promise<TData>,
): Promise<TData> => {
  try {
    return await executor()
  } catch (error: unknown) {
    if (!isUnauthorizedError(error)) {
      throw error
    }
  }

  await refreshSession()

  return executor()
}

export const register = (input: RegisterInput): Promise<AuthUserResponse> =>
  post<AuthUserResponse>('/auth/register', {
    body: input,
  })

export const login = (input: LoginInput): Promise<AuthUserResponse> =>
  post<AuthUserResponse>('/auth/login', {
    body: input,
  })

export const forgotPassword = (
  input: ForgotPasswordInput,
): Promise<StatusMessageResponse> =>
  post<StatusMessageResponse>('/auth/forgot-password', {
    body: input,
  })

export const resetPassword = (
  input: ResetPasswordInput,
): Promise<StatusMessageResponse> =>
  post<StatusMessageResponse>('/auth/reset-password', {
    body: input,
  })

export const verifyEmail = (input: VerifyEmailInput): Promise<StatusMessageResponse> =>
  post<StatusMessageResponse>('/auth/verify-email', {
    body: input,
  })

export const refreshSession = async (): Promise<void> => {
  refreshPromise ??= post<StatusMessageResponse>('/auth/refresh')
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null
    })

  await refreshPromise
}

export const getCurrentUser = async (): Promise<AuthenticatedUser | null> => {
  try {
    const response = await withSessionRecovery(() => get<AuthUserResponse>('/auth/me'))

    return response.user
  } catch (error: unknown) {
    if (isUnauthorizedError(error)) {
      return null
    }

    throw error
  }
}

export const getSessions = async (): Promise<AuthSessionItem[]> => {
  const response = await withSessionRecovery(() =>
    get<AuthSessionsResponse>('/auth/sessions'),
  )

  return response.sessions
}

export const revokeSession = (sessionId: string): Promise<StatusMessageResponse> =>
  withSessionRecovery(() =>
    del<StatusMessageResponse>(`/auth/sessions/${encodeURIComponent(sessionId)}`),
  )

export const logout = async (): Promise<void> => {
  try {
    await withSessionRecovery(() =>
      post<StatusMessageResponse>('/auth/logout').then(() => undefined),
    )
  } catch (error: unknown) {
    if (!isUnauthorizedError(error)) {
      throw error
    }
  }
}

export const logoutAll = async (): Promise<void> => {
  try {
    await withSessionRecovery(() =>
      post<StatusMessageResponse>('/auth/logout-all').then(() => undefined),
    )
  } catch (error: unknown) {
    if (!isUnauthorizedError(error)) {
      throw error
    }
  }
}

export const resendVerification = (): Promise<StatusMessageResponse> =>
  withSessionRecovery(() => post<StatusMessageResponse>('/auth/resend-verification'))

export const changePassword = (
  input: ChangePasswordInput,
): Promise<StatusMessageResponse> =>
  withSessionRecovery(() =>
    post<StatusMessageResponse>('/auth/change-password', {
      body: input,
    }),
  )

export const changeEmail = (input: ChangeEmailInput): Promise<StatusMessageResponse> =>
  withSessionRecovery(() =>
    patch<StatusMessageResponse>('/auth/me/email', {
      body: input,
    }),
  )

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    staleTime: 60_000,
  })

export const sessionsQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.sessions(),
    queryFn: getSessions,
    staleTime: 30_000,
  })
