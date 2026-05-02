import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

export interface PageContainerProps {
  children: ReactNode
  className?: string
}

export const PageContainer = ({ children, className }: PageContainerProps): JSX.Element => (
  <div className={cn('mx-auto w-full max-w-6xl px-4 py-8 sm:px-8', className)}>{children}</div>
)
