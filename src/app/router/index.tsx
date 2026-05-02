/* eslint-disable react-refresh/only-export-components */

import {
  Outlet,
  RouterProvider as TanStackRouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { ProtectedLayout } from '@/app/layouts/ProtectedLayout'
import { PublicLayout } from '@/app/layouts/PublicLayout'
import { HomePage } from '@/pages/HomePage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { UnauthorizedPage } from '@/pages/errors/UnauthorizedPage'
import { ChangePasswordPage } from '@/pages/security/ChangePasswordPage'
import { Spinner } from '@/shared/components/ui/Spinner'
import { env } from '@/shared/lib/env'
import i18n from '@/app/providers/i18n'

import type { RouterContext } from './guards'
import { requireAdmin, requireAuth, requireGuest } from './guards'

const RootRouteComponent = (): JSX.Element => (
  <>
    <Outlet />
    {env.enableDevtools ? <TanStackRouterDevtools position="bottom-right" /> : null}
  </>
)

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootRouteComponent,
  notFoundComponent: NotFoundPage,
})

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'login',
  beforeLoad: requireGuest,
  component: LoginPage,
})

const registerRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'register',
  beforeLoad: requireGuest,
  component: RegisterPage,
})

const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'forgot-password',
  component: ForgotPasswordPage,
})

const resetPasswordRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'reset-password',
  component: ResetPasswordPage,
})

const verifyEmailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'verify-email',
  component: VerifyEmailPage,
})

const unauthorizedRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: 'unauthorized',
  component: UnauthorizedPage,
})

const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'app',
  beforeLoad: requireAuth,
  component: ProtectedLayout,
})

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: '/',
  component: DashboardPage,
})

const changePasswordRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: 'security/change-password',
  component: ChangePasswordPage,
})

import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'

const adminDashboardRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: 'admin',
  beforeLoad: requireAdmin,
  component: AdminDashboardPage,
})

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    loginRoute,
    registerRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    verifyEmailRoute,
    unauthorizedRoute,
  ]),
  protectedLayoutRoute.addChildren([dashboardRoute, changePasswordRoute, adminDashboardRoute]),
])

export const createAppRouter = (queryClient: QueryClient) =>
  createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    defaultPendingComponent: () => (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner label={i18n.t('common.loadingRoute')} />
      </div>
    ),
  })

export type AppRouter = ReturnType<typeof createAppRouter>

export interface RouterProviderProps {
  router: AppRouter
}

export const RouterProvider = ({ router }: RouterProviderProps): JSX.Element => (
  <TanStackRouterProvider router={router} />
)

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}
