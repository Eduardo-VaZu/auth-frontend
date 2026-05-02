export type UserStatus = 'active' | 'disabled' | 'locked' | 'pending_verification'
export type AdminManagedUserStatus = 'active' | 'disabled' | 'locked'

export interface RoleDto {
  id: string
  code: string
  name: string
  description: string | null
  isSystem: boolean
}

export interface AdminUserDto {
  id: string
  email: string
  role: string
  roles: string[]
  status: UserStatus
  authzVersion: number
  emailVerifiedAt: string | null
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface AdminUsersPaginationDto {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ListAdminUsersResultDto {
  users: AdminUserDto[]
  pagination: AdminUsersPaginationDto
}

export interface RolesResponseDto {
  roles: RoleDto[]
}

export interface UserRolesResponseDto {
  userId: string
  roles: RoleDto[]
}

export interface UpdateUserStatusInput {
  status: AdminManagedUserStatus
}

export interface AssignRoleInput {
  roleId: string
}
