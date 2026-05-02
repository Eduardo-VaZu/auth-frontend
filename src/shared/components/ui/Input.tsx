import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cn } from '@/shared/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, hint, id, label, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <label className="flex flex-col gap-2 text-[14px] font-medium text-text-primary" htmlFor={inputId}>
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary">{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-md border border-border-strong bg-surface-2 px-4 py-3 text-[14px] text-text-primary shadow-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary',
            error === undefined ? '' : 'border-error focus:border-error focus:ring-error',
            className,
          )}
          {...props}
        />
        {error === undefined ? null : <span className="text-[13px] text-error">{error}</span>}
        {error === undefined && hint !== undefined ? (
          <span className="text-[13px] text-text-muted">{hint}</span>
        ) : null}
      </label>
    )
  },
)

Input.displayName = 'Input'
