import { Link } from '@tanstack/react-router'
import { Fingerprint, KeyRound, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { Seo } from '@/shared/components/seo/Seo'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { Spinner } from '@/shared/components/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'

export const DashboardPage = (): JSX.Element => {
  const { t } = useTranslation()
  const currentUserQuery = useCurrentUser()
  const user = currentUserQuery.data ?? null
  const dashboardCards = [
    {
      icon: RefreshCw,
      title: t('dashboard.cards.refresh.title'),
      description: t('dashboard.cards.refresh.description'),
    },
    {
      icon: Fingerprint,
      title: t('dashboard.cards.sessions.title'),
      description: t('dashboard.cards.sessions.description'),
    },
    {
      icon: KeyRound,
      title: t('dashboard.cards.password.title'),
      description: t('dashboard.cards.password.description'),
    },
  ]

  if (currentUserQuery.isPending) {
    return (
      <>
        <Seo title={t('nav.dashboard')} description={t('dashboard.loading')} path={ROUTES.dashboard} index={false} />
        <PageContainer className="py-12">
          <Spinner label={t('dashboard.loading')} />
        </PageContainer>
      </>
    )
  }

  if (user === null) {
    return (
      <>
        <Seo title={t('nav.dashboard')} description={t('dashboard.emptyDescription')} path={ROUTES.dashboard} index={false} />
        <PageContainer className="py-12">
          <EmptyState
            title={t('dashboard.emptyTitle')}
            description={t('dashboard.emptyDescription')}
            action={
              <Link
                to={ROUTES.login}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-semibold text-on-primary transition hover:bg-primary-hover"
              >
                {t('dashboard.emptyAction')}
              </Link>
            }
          />
        </PageContainer>
      </>
    )
  }

  return (
    <>
      <Seo title={t('nav.dashboard')} description={t('dashboard.cards.sessions.description')} path={ROUTES.dashboard} index={false} />
      <PageContainer className="space-y-6 py-8">
        <section className="rounded-xl border border-border-subtle bg-surface p-7 shadow-panel sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
            {t('dashboard.authenticated')}
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{user.email}</h1>
          <p className="mt-3 text-[14px] text-text-secondary">
            {t('dashboard.role')}: <span className="font-semibold text-text-primary">{user.role === 'admin' ? t('dashboard.admin') : t('dashboard.user')}</span>
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {dashboardCards.map(({ description, icon: Icon, title }) => (
            <article key={title} className="rounded-lg border border-border-subtle bg-surface-2 p-6 shadow-panel-elevated">
              <div className="inline-flex rounded-md border border-border-strong bg-surface-3 p-3 text-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-[16px] font-semibold text-text-primary">{title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </section>
      </PageContainer>
    </>
  )
}
