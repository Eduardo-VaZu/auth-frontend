import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { Seo } from '@/shared/components/seo/Seo'
import { Alert } from '@/shared/components/ui/Alert'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'

export const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSuccess = (): void => {
    void navigate({
      to: ROUTES.login,
    })
  }

  return (
    <>
      <Seo
        title={t('auth.register.subtitle')}
        description={t('auth.register.description')}
        path={ROUTES.register}
        index={false}
      />
      <PageContainer className="grid gap-6 pb-14 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="animate-rise-in rounded-xl border border-border-subtle bg-surface p-7 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
            {t('auth.register.subtitle')}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">{t('auth.register.title')}</h1>
          <p className="mt-3 max-w-lg text-[14px] text-text-secondary sm:text-[15px] leading-relaxed">{t('auth.register.description')}</p>
          <Alert variant="info" className="mt-6">
            {t('auth.register.alert')}
          </Alert>
        </section>

        <section className="animate-rise-in rounded-xl border border-border-strong bg-surface-2 p-7 shadow-panel-elevated [animation-delay:80ms] sm:p-8 lg:p-10">
          <RegisterForm onSuccess={handleSuccess} />
          <p className="mt-6 text-[14px] text-text-secondary">
            {t('auth.register.footerPrefix')}{' '}
            <Link to={ROUTES.login} className="font-semibold text-text-primary transition hover:text-primary">
              {t('auth.register.footerLink')}
            </Link>
          </p>
        </section>
      </PageContainer>
    </>
  )
}
