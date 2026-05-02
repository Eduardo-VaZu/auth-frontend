import { Outlet } from '@tanstack/react-router'

import { AppHeader } from '@/shared/components/layout/AppHeader'

export const ProtectedLayout = (): JSX.Element => (
  <div className="relative min-h-screen overflow-hidden">
    <AppHeader />
    <main className="relative z-10">
      <Outlet />
    </main>
  </div>
)
