import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Shield, ShieldCheck, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { BrandMark } from '@/shared/components/brand/BrandMark'
import { Seo } from '@/shared/components/seo/Seo'
import { buildSeoUrl } from '@/shared/utils/seo'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'
import { env } from '@/shared/lib/env'

export const HomePage = (): JSX.Element => {
  const { status } = useAuth()
  const { i18n, t } = useTranslation()

  const featureCards = [
    {
      icon: ShieldCheck,
      title: t('home.features.cookies.title'),
      description: t('home.features.cookies.description'),
    },
    {
      icon: Workflow,
      title: t('home.features.recovery.title'),
      description: t('home.features.recovery.description'),
    },
    {
      icon: Shield,
      title: t('home.features.ux.title'),
      description: t('home.features.ux.description'),
    },
  ]

  const primaryRoute = status === 'authenticated' ? ROUTES.dashboard : ROUTES.login
  const primaryLabel = status === 'authenticated' ? t('home.primaryAction') : t('home.loginAction')

  return (
    <>
      <Seo
        title={t('home.title')}
        description={t('home.description')}
        path={ROUTES.home}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: env.appName,
          description: t('home.description'),
          url: buildSeoUrl(ROUTES.home),
          inLanguage: i18n.resolvedLanguage ?? i18n.language,
        }}
      />
      <PageContainer className="relative grid gap-8 pb-16 pt-10 lg:grid-cols-2 lg:items-stretch lg:pt-14">
        {/* Left main panel */}
        <section className="animate-rise-in rounded-xl border border-border-subtle bg-surface p-8 shadow-panel sm:p-12">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10 shrink-0 text-text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">JetAuth Console</p>
              <p className="text-sm font-medium text-text-muted">{t('home.kicker')}</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            <p className="inline-flex items-center rounded-md border border-border-subtle bg-surface-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              {t('home.subtitle')}
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
              {t('home.title')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
              {t('home.description')}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={primaryRoute}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-[14px] font-semibold text-on-primary transition hover:bg-primary-hover"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to={ROUTES.register}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border-strong bg-surface-3 px-5 text-[14px] font-semibold text-text-primary transition hover:bg-border-subtle"
            >
              {t('home.secondaryAction')}
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {featureCards.map(({ title }) => (
              <div key={title} className="rounded-lg border border-border-subtle bg-background-elevated px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right sub-panels */}
        <section className="grid gap-4">
          <article className="animate-rise-in rounded-lg border border-border-subtle bg-surface-2 p-6 shadow-panel-elevated [animation-delay:80ms] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{t('home.kicker')}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
              {t('home.description')}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {featureCards.slice(0, 2).map(({ title }) => (
                <div key={title} className="rounded-md border border-border-strong bg-surface-3 px-4 py-3 text-[13px] font-semibold text-text-primary">
                  {title}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map(({ description, icon: Icon, title }, index) => (
              <article
                key={title}
                className={`animate-rise-in rounded-lg border border-border-subtle bg-surface-2 p-6 shadow-panel-elevated [animation-delay:${120 + index * 60}ms] ${index === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="inline-flex rounded-md border border-border-strong bg-surface-3 p-2.5 text-secondary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-[16px] font-semibold tracking-tight text-text-primary">{title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{description}</p>
              </article>
            ))}
          </div>

          <article className="animate-rise-in rounded-lg border border-border-subtle bg-background-elevated p-6 [animation-delay:300ms]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{t('home.consoleLabel')}</p>
                <p className="mt-1 text-[13px] text-text-muted">{t('home.consoleDescription')}</p>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-success/20 bg-success/10 px-3 py-1.5 text-[13px] font-semibold text-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {t('home.statusBadge')}
              </div>
            </div>
          </article>
        </section>
      </PageContainer>
    </>
  )
}
