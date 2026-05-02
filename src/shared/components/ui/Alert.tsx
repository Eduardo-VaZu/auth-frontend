import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

type AlertVariant = 'error' | 'success' | 'info'

const variantClasses: Record<AlertVariant, string> = {
  error: 'border-error/20 bg-error/10 text-error',
  success: 'border-success/20 bg-success/10 text-success',
  info: 'border-border-strong bg-surface-2 text-text-primary',
}

export interface AlertProps {
  children: ReactNode
  title?: string
  variant?: AlertVariant
  className?: string
}

export const Alert = ({
  children,
  title,
  variant = 'info',
  className,
}: AlertProps): JSX.Element => (
  <div
    className={cn(
      'rounded-md border px-4 py-3 text-[14px] shadow-sm',
      variantClasses[variant],
      className,
    )}
  >
    {title === undefined ? null : <p className="mb-1 font-semibold">{title}</p>}
    <div>{children}</div>
  </div>
)
