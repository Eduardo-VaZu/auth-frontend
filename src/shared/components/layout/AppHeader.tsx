import { Link, useNavigate } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { ROUTES } from '@/shared/constants/routes'

import { Button } from '../ui/Button'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { PageContainer } from '../ui/PageContainer'

export const AppHeader = (): JSX.Element => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const logoutMutation = useLogout()
  const { t } = useTranslation()

  const handleLogout = (): void => {
    void (async () => {
      await logoutMutation.mutateAsync()
      await navigate({
        to: ROUTES.login,
      })
    })()
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle bg-background-elevated/80 backdrop-blur-xl">
      <PageContainer className="py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary p-2.5 text-on-primary shadow-panel">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">{t('nav.session')}</p>
              <p className="text-[14px] font-semibold text-text-primary">{user?.email ?? t('nav.authArea')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher />
            <nav className="flex items-center gap-1 rounded-md border border-border-strong bg-surface-2 p-1">
              <Link
                to={ROUTES.dashboard}
                className="rounded-sm px-3 py-2 text-[14px] font-medium text-text-secondary transition hover:bg-border-subtle hover:text-text-primary"
                activeProps={{ className: 'rounded-sm bg-surface-3 px-3 py-2 text-[14px] font-medium text-text-primary' }}
              >
                {t('nav.dashboard', 'Panel')}
              </Link>
              {user?.roles?.includes('admin') && (
                <Link
                  to={ROUTES.admin}
                  className="rounded-sm px-3 py-2 text-[14px] font-medium text-text-secondary transition hover:bg-border-subtle hover:text-text-primary flex items-center gap-1.5"
                  activeProps={{ className: 'rounded-sm bg-surface-3 px-3 py-2 text-[14px] font-medium text-text-primary flex items-center gap-1.5' }}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <Link
                to={ROUTES.changePassword}
                className="rounded-sm px-3 py-2 text-[14px] font-medium text-text-secondary transition hover:bg-border-subtle hover:text-text-primary"
                activeProps={{ className: 'rounded-sm bg-surface-3 px-3 py-2 text-[14px] font-medium text-text-primary' }}
              >
                {t('nav.security', 'Seguridad')}
              </Link>
            </nav>
            <Button variant="ghost" onClick={handleLogout} isLoading={logoutMutation.isPending}>
              {t('nav.logout')}
            </Button>
          </div>
        </div>
      </PageContainer>
    </header>
  )
}
