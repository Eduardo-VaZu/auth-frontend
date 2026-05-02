import { ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useLogoutAll } from '@/features/auth/hooks/useLogoutAll'
import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

interface LogoutAllDevicesProps {
  onSuccess?: () => void
}

export const LogoutAllDevices = ({ onSuccess }: LogoutAllDevicesProps): JSX.Element => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const logoutAllMutation = useLogoutAll()
  const { t } = useTranslation()

  const handleLogoutAll = async (): Promise<void> => {
    setSubmitError(null)

    try {
      await logoutAllMutation.mutateAsync()
      onSuccess?.()
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error, t('auth.sessions.error')))
    }
  }

  return (
    <Card className="flex flex-col gap-4 border-error/20 bg-error/10 p-6">
      <div className="flex items-center gap-3 text-error">
        <ShieldAlert className="h-6 w-6" />
        <h3 className="text-lg font-semibold text-error">{t('auth.sessions.title')}</h3>
      </div>

      <p className="text-[14px] text-error/85">{t('auth.sessions.description')}</p>
      {submitError === null ? null : <Alert variant="error">{submitError}</Alert>}

      {!isConfirming ? (
        <Button variant="secondary" className="w-fit" onClick={() => setIsConfirming(true)}>
          {t('auth.sessions.button')}
        </Button>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="danger" isLoading={logoutAllMutation.isPending} onClick={handleLogoutAll}>
            {t('auth.sessions.confirm')}
          </Button>
          <Button
            variant="ghost"
            disabled={logoutAllMutation.isPending}
            onClick={() => setIsConfirming(false)}
          >
            {t('auth.sessions.cancel')}
          </Button>
        </div>
      )}
    </Card>
  )
}
