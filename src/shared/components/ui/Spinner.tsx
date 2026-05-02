import { LoaderCircle } from 'lucide-react'

import { cn } from '@/shared/utils/cn'

export interface SpinnerProps {
  className?: string
  label?: string
}

export const Spinner = ({ className, label = 'Loading' }: SpinnerProps): JSX.Element => (
  <div
    className={cn('inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface-2 px-3 py-2 text-[14px] text-text-secondary', className)}
    role="status"
    aria-live="polite"
  >
    <LoaderCircle className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
    <span>{label}</span>
  </div>
)
