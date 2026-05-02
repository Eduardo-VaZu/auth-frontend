import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Seo } from '@/shared/components/seo/Seo'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'

export const UnauthorizedPage = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('errors.unauthorized.title')} description={t('errors.unauthorized.description')} index={false} />
      <PageContainer className="py-16">
        <div className="mx-auto max-w-xl rounded-xl border border-border-subtle bg-surface p-10 text-center shadow-panel">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">401</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary">{t('errors.unauthorized.title')}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{t('errors.unauthorized.description')}</p>
          <Link
            to={ROUTES.login}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-[14px] font-semibold text-on-primary transition hover:bg-primary-hover"
          >
            {t('errors.unauthorized.action')}
          </Link>
        </div>
      </PageContainer>
    </>
  )
}
