import { Shield, ShieldAlert, CheckCircle, Ban, RefreshCw, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { AdminManagedUserStatus } from '@/features/admin/types/admin.types'
import { useUpdateUserStatus } from '@/features/admin/hooks/useUpdateUserStatus'
import { useUsers } from '@/features/admin/hooks/useUsers'
import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Spinner } from '@/shared/components/ui/Spinner'

const formatDateTime = (dateValue: string | null, locale: string): string => {
  if (!dateValue) return '-'
  const value = new Date(dateValue)
  if (Number.isNaN(value.getTime())) return dateValue

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

export const AdminDashboardPage = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const { data, isLoading, isError, refetch } = useUsers()
  const updateStatusMutation = useUpdateUserStatus()

  const handleBlockUser = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'locked' : 'active'
    updateStatusMutation.mutate({ userId, status: newStatus as AdminManagedUserStatus })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner label={t('admin.loading', 'Cargando usuarios...')} />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-4xl py-8">
        <Alert variant="error">{t('admin.error', 'Error al cargar usuarios')}</Alert>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl py-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Panel de Administración</h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            Gestión centralizada de usuarios y controles de acceso del sistema.
          </p>
        </div>
        <Button variant="secondary" onClick={() => { refetch().catch(() => {}) }}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
      </div>

      <Card className="border-border-strong bg-surface-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="border-b border-border-strong bg-surface-3/50 text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Último Acceso</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {data.users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-surface-3/30">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-text-primary">{user.email}</div>
                    <div className="text-[12px] text-text-secondary font-mono mt-0.5">{user.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    {user.roles.includes('admin') ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] text-primary uppercase">
                        <Shield className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-3 px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] text-text-secondary uppercase">
                        Usuario
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] text-success uppercase">
                        <CheckCircle className="h-3 w-3" />
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-error/20 bg-error/10 px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] text-error uppercase">
                        <ShieldAlert className="h-3 w-3" />
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-[13px]">
                    {formatDateTime(user.lastLoginAt, i18n.language)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant={user.status === 'active' ? 'danger' : 'secondary'}
                      size="sm"
                      isLoading={updateStatusMutation.isPending && updateStatusMutation.variables?.userId === user.id}
                      onClick={() => handleBlockUser(user.id, user.status)}
                    >
                      {user.status === 'active' ? (
                        <>
                          <Ban className="mr-2 h-4 w-4" />
                          Bloquear
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Desbloquear
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
