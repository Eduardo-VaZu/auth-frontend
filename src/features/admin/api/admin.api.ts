import { queryOptions } from '@tanstack/react-query'

import { del, get, patch, post } from '@/shared/lib/fetchClient'
import type { StatusMessageResponse } from '@/shared/types/api.types'

import type {
  AdminUserDto,
  AssignRoleInput,
  ListAdminUsersResultDto,
  RolesResponseDto,
  UpdateUserStatusInput,
  UserRolesResponseDto,
} from '../types/admin.types'

export const adminKeys = {
  all: ['admin'] as const,
  users: () => [...adminKeys.all, 'users'] as const,
  user: (userId: string) => [...adminKeys.users(), userId] as const,
  roles: () => [...adminKeys.all, 'roles'] as const,
  userRoles: (userId: string) => [...adminKeys.user(userId), 'roles'] as const,
}

export const getUsers = async (
  page = 1,
  limit = 20,
  search?: string,
): Promise<ListAdminUsersResultDto> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })
  
  if (search) {
    params.append('search', search)
  }

  return get<ListAdminUsersResultDto>(`/admin/users?${params.toString()}`)
}

export const getUserProfile = (userId: string): Promise<{ user: AdminUserDto }> =>
  get<{ user: AdminUserDto }>(`/admin/users/${encodeURIComponent(userId)}`)

export const getRoles = (): Promise<RolesResponseDto> =>
  get<RolesResponseDto>('/admin/roles')

export const getUserRoles = (userId: string): Promise<UserRolesResponseDto> =>
  get<UserRolesResponseDto>(`/admin/users/${encodeURIComponent(userId)}/roles`)

export const updateUserStatus = (
  userId: string,
  input: UpdateUserStatusInput,
): Promise<StatusMessageResponse> =>
  patch<StatusMessageResponse>(`/admin/users/${encodeURIComponent(userId)}/status`, {
    body: input,
  })

export const deleteUser = (userId: string): Promise<StatusMessageResponse> =>
  del<StatusMessageResponse>(`/admin/users/${encodeURIComponent(userId)}`)

export const assignRole = (
  userId: string,
  input: AssignRoleInput,
): Promise<StatusMessageResponse> =>
  post<StatusMessageResponse>(`/admin/users/${encodeURIComponent(userId)}/roles`, {
    body: input,
  })

export const revokeRole = (
  userId: string,
  roleId: string,
): Promise<StatusMessageResponse> =>
  del<StatusMessageResponse>(
    `/admin/users/${encodeURIComponent(userId)}/roles/${encodeURIComponent(roleId)}`,
  )

export const usersQueryOptions = (page = 1, limit = 20, search?: string) =>
  queryOptions({
    queryKey: [...adminKeys.users(), { page, limit, search }],
    queryFn: () => getUsers(page, limit, search),
  })

export const rolesQueryOptions = () =>
  queryOptions({
    queryKey: adminKeys.roles(),
    queryFn: getRoles,
  })
