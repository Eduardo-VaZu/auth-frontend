import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ChangeEmailForm } from '@/features/auth/components/ChangeEmailForm'
import { ChangePasswordForm } from '@/features/auth/components/ChangePasswordForm'
import { LogoutAllDevices } from '@/features/auth/components/LogoutAllDevices'
import { SessionList } from '@/features/auth/components/SessionList'
import { useResendVerification } from '@/features/auth/hooks/useResendVerification'
import { Seo } from '@/shared/components/seo/Seo'
import { Alert } from '@/shared/components/ui/Alert'
import { Button } from '@/shared/components/ui/Button'
import { Card } from '@/shared/components/ui/Card'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

export const ChangePasswordPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const resendVerificationMutation = useResendVerification()
  const [resendFeedback, setResendFeedback] = useState<string | null>(null)
  const [resendError, setResendError] = useState<string | null>(null)

  const handleSessionReset = (): void => {
    void navigate({
      to: ROUTES.login,
    })
  }

  const handleResendVerification = async (): Promise<void> => {
    setResendError(null)
    setResendFeedback(null)

    try {
      const response = await resendVerificationMutation.mutateAsync()
      setResendFeedback(response.message || t('auth.verifyEmail.resendSuccess'))
    } catch (error: unknown) {
      setResendError(getErrorMessage(error, t('auth.verifyEmail.resendError')))
    }
  }

  return (
    <>
      <Seo title={t('security.title')} description={t('security.description')} path={ROUTES.changePassword} index={false} />
      <PageContainer className="grid gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border-subtle bg-surface p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{t('security.subtitle')}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">{t('security.title')}</h1>
            <p className="mt-3 max-w-2xl text-[14px] text-text-secondary sm:text-[15px] leading-relaxed">{t('security.description')}</p>
          </section>

          <Card className="p-6 sm:p-8 bg-surface-2 border-border-strong">
            <div className="mb-6 space-y-2">
              <h2 className="text-xl font-semibold text-text-primary">{t('auth.changePassword.title')}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">{t('auth.changePassword.description')}</p>
            </div>
            <ChangePasswordForm onSuccess={handleSessionReset} />
          </Card>

          <Card className="p-6 sm:p-8 bg-surface-2 border-border-strong">
            <div className="mb-6 space-y-2">
              <h2 className="text-xl font-semibold text-text-primary">{t('auth.changeEmail.title')}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">{t('auth.changeEmail.description')}</p>
            </div>
            <ChangeEmailForm onSuccess={handleSessionReset} />
            <div className="mt-5 space-y-3">
              <Button
                variant="ghost"
                isLoading={resendVerificationMutation.isPending}
                onClick={() => {
                  void handleResendVerification()
                }}
              >
                {t('auth.verifyEmail.resendAction')}
              </Button>
              {resendFeedback === null ? null : <Alert variant="success">{resendFeedback}</Alert>}
              {resendError === null ? null : <Alert variant="error">{resendError}</Alert>}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border-subtle bg-surface-2 p-6">
            <h2 className="text-xl font-semibold text-text-primary">{t('auth.sessionsList.title')}</h2>
            <p className="mt-2 text-[14px] text-text-secondary leading-relaxed">{t('auth.sessionsList.description')}</p>
          </section>
          <SessionList />
          <LogoutAllDevices onSuccess={handleSessionReset} />
        </div>
      </PageContainer>
    </>
  )
}
