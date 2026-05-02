import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm'
import { Seo } from '@/shared/components/seo/Seo'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'

const resolveTokenFromSearch = (): string | undefined => {
  const searchParams = new URLSearchParams(window.location.search)
  const token = searchParams.get('token')

  return token === null || token.length === 0 ? undefined : token
}

export const VerifyEmailPage = (): JSX.Element => {
  const { t } = useTranslation()
  const initialToken = resolveTokenFromSearch()

  return (
    <>
      <Seo
        title={t('auth.verifyEmail.subtitle')}
        description={t('auth.verifyEmail.description')}
        path={ROUTES.verifyEmail}
        index={false}
      />
      <PageContainer className="grid gap-6 pb-14 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="animate-rise-in rounded-xl border border-border-subtle bg-surface p-7 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
            {t('auth.verifyEmail.subtitle')}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary">{t('auth.verifyEmail.title')}</h1>
          <p className="mt-3 max-w-lg text-[14px] text-text-secondary sm:text-[15px] leading-relaxed">{t('auth.verifyEmail.description')}</p>
        </section>

        <section className="animate-rise-in rounded-xl border border-border-strong bg-surface-2 p-7 shadow-panel-elevated [animation-delay:80ms] sm:p-8 lg:p-10">
          <VerifyEmailForm initialToken={initialToken} />
          <p className="mt-6 text-[14px] text-text-secondary">
            <Link to={ROUTES.login} className="font-semibold text-text-primary transition hover:text-primary">
              {t('auth.verifyEmail.backToLogin')}
            </Link>
          </p>
        </section>
      </PageContainer>
    </>
  )
}
