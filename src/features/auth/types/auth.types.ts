export type UserRole = 'user' | 'admin'

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
  roles: string[]
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
}

export interface ForgotPasswordInput {
  email: string
}

export interface ResetPasswordInput {
  token: string
  newPassword: string
}

export interface VerifyEmailInput {
  token: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface ChangeEmailInput {
  email: string
}

export interface AuthUserResponse {
  user: AuthenticatedUser
}

export interface AuthSessionItem {
  id: string
  deviceName: string | null
  userAgent: string | null
  ipAddress: string | null
  lastActivityAt: string
  expiresAt: string
  createdAt: string
  isCurrent: boolean
}

export interface AuthSessionsResponse {
  sessions: AuthSessionItem[]
}

export type AuthStatus = 'loading' | 'authenticated' | 'guest'
