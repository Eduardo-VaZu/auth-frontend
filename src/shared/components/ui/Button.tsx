import { LoaderCircle } from 'lucide-react'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: ButtonVariant
  size?: 'default' | 'sm'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary shadow-panel hover:bg-primary-hover',
  secondary: 'border border-border-strong bg-surface-3 text-text-primary hover:bg-border-subtle',
  ghost: 'bg-background-elevated text-text-secondary hover:text-text-primary',
  danger: 'bg-error text-on-primary shadow-panel hover:bg-[#E55B69]',
}

const sizeClasses = {
  default: 'px-5 py-3 text-[14px]',
  sm: 'px-3.5 py-2 text-[13px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      type = 'button',
      variant = 'primary',
      size = 'default',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  ),
)

Button.displayName = 'Button'
