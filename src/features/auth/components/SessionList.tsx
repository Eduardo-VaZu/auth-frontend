import { Laptop2, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useRevokeSession } from '@/features/auth/hooks/useRevokeSession'
import { useSessions } from '@/features/auth/hooks/useSessions'
import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { Spinner } from '@/shared/components/ui/Spinner'

const formatDateTime = (dateValue: string, locale: string): string => {
  const value = new Date(dateValue)

  if (Number.isNaN(value.getTime())) {
    return dateValue
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

const formatSessionLabel = (
  value: string | null,
  fallback: string,
): string => (value === null || value.length === 0 ? fallback : value)

export const SessionList = (): JSX.Element => {
  const sessionsQuery = useSessions()
  const revokeSessionMutation = useRevokeSession()
  const { i18n, t } = useTranslation()
  const sessions = sessionsQuery.data ?? []
  const sortedSessions = [...sessions].sort((sessionA, sessionB) =>
    sessionA.isCurrent === sessionB.isCurrent ? 0 : sessionA.isCurrent ? -1 : 1,
  )

  const handleRevoke = async (sessionId: string): Promise<void> => {
    try {
      await revokeSessionMutation.mutateAsync(sessionId)
    } catch {
      // Mutation error is already exposed through Query state.
    }
  }

  if (sessionsQuery.isPending) {
    return (
      <div className="py-2">
        <Spinner label={t('auth.sessionsList.loading')} />
      </div>
    )
  }

  if (sessionsQuery.isError) {
    return <Alert variant="error">{t('auth.sessionsList.error')}</Alert>
  }

  if (sortedSessions.length === 0) {
    return <Alert variant="info">{t('auth.sessionsList.empty')}</Alert>
  }

  return (
    <div className="space-y-4">
      {sortedSessions.map((session) => {
        const isPending =
          revokeSessionMutation.isPending &&
          revokeSessionMutation.variables === session.id

        return (
          <Card key={session.id} className="border-border-strong bg-surface-3 p-5 overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1 min-w-0 max-w-full">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-text-primary truncate">
                  <Laptop2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {formatSessionLabel(
                      session.deviceName,
                      t('auth.sessionsList.unknownDevice'),
                    )}
                  </span>
                </p>
                <p className="text-[13px] text-text-secondary">
                  {t('auth.sessionsList.ip')}: {formatSessionLabel(session.ipAddress, '-')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {session.isCurrent ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/20 px-3 py-1 text-[11px] uppercase tracking-[0.1em] font-bold text-success">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('auth.sessionsList.current')}
                  </span>
                ) : null}
                <Button
                  variant={session.isCurrent ? 'danger' : 'secondary'}
                  size="sm"
                  isLoading={isPending}
                  onClick={() => {
                    void handleRevoke(session.id)
                  }}
                >
                  {session.isCurrent
                    ? t('auth.sessionsList.revokeCurrent')
                    : t('auth.sessionsList.revoke')}
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-[13px] text-text-secondary sm:grid-cols-3">
              <p>
                {t('auth.sessionsList.lastActivity')}:{' '}
                {formatDateTime(session.lastActivityAt, i18n.language)}
              </p>
              <p>
                {t('auth.sessionsList.createdAt')}:{' '}
                {formatDateTime(session.createdAt, i18n.language)}
              </p>
              <p>
                {t('auth.sessionsList.expiresAt')}:{' '}
                {formatDateTime(session.expiresAt, i18n.language)}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
