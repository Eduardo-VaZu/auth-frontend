import type { AppRouter } from '@/app/router'
import { RouterProvider as BaseRouterProvider } from '@/app/router'

export interface AppRouterProviderProps {
  router: AppRouter
}

export const AppRouterProvider = ({ router }: AppRouterProviderProps): JSX.Element => (
  <BaseRouterProvider router={router} />
)
