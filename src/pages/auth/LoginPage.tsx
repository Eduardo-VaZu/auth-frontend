import { Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { Seo } from '@/shared/components/seo/Seo'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSuccess = (): void => {
    void navigate({
      to: ROUTES.dashboard,
    })
  }

  return (
    <>
      <Seo title={t('auth.login.subtitle')} description={t('auth.login.description')} path={ROUTES.login} index={false} />
      <PageContainer className="grid gap-6 pb-14 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="animate-rise-in rounded-xl border border-border-subtle bg-surface p-7 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{t('auth.login.subtitle')}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">{t('auth.login.title')}</h1>
          <p className="mt-3 max-w-lg text-[14px] text-text-secondary sm:text-[15px] leading-relaxed">{t('auth.login.description')}</p>
        </section>

        <section className="animate-rise-in rounded-xl border border-border-strong bg-surface-2 p-7 shadow-panel-elevated [animation-delay:80ms] sm:p-8 lg:p-10">
          <LoginForm onSuccess={handleSuccess} />
          <div className="mt-6 flex flex-col gap-3 text-[14px] text-text-secondary">
            <p>
              {t('auth.login.footerPrefix')}{' '}
              <Link to={ROUTES.register} className="font-semibold text-text-primary transition hover:text-primary">
                {t('auth.login.footerLink')}
              </Link>
            </p>
            <Link to={ROUTES.forgotPassword} className="font-semibold text-text-primary transition hover:text-primary">
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
        </section>
      </PageContainer>
    </>
  )
}
