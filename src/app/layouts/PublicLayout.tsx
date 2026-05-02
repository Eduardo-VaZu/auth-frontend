import { Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/shared/components/brand/BrandMark'
import { LanguageSwitcher } from '@/shared/components/ui/LanguageSwitcher'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { ROUTES } from '@/shared/constants/routes'

export const PublicLayout = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0d10] text-[#f3f6fb]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(54,194,255,0.14),transparent_28%),linear-gradient(180deg,#0b0d10_0%,#10141b_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#0d1017]/82 backdrop-blur-xl">
        <PageContainer className="py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link to={ROUTES.home} className="flex items-center gap-3 text-[#f3f6fb]">
              <BrandMark className="h-11 w-11 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9385ff]">JetAuth</p>
                <p className="text-sm font-medium text-[#9ba6b8]">{t('home.subtitle')}</p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <LanguageSwitcher tone="dark" />
              <nav className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_18px_48px_-32px_rgba(0,0,0,0.7)]">
                <Link
                  to={ROUTES.login}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-[#c8d0dd] transition hover:bg-white/[0.06] hover:text-white"
                  activeProps={{ className: 'rounded-xl bg-[#171c26] px-3.5 py-2 text-sm font-medium text-white' }}
                >
                  {t('auth.login.submit')}
                </Link>
                <Link
                  to={ROUTES.register}
                  className="rounded-xl bg-[#7c6cff] px-3.5 py-2 text-sm font-semibold text-[#f7f8ff] shadow-[0_16px_36px_-24px_rgba(124,108,255,0.95)] transition hover:bg-[#9385ff]"
                >
                  {t('auth.register.submit')}
                </Link>
              </nav>
            </div>
          </div>
        </PageContainer>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
