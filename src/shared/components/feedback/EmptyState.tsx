import type { ReactNode } from 'react'

export interface EmptyStateProps {
  action?: ReactNode
  description: string
  title: string
}

export const EmptyState = ({ action, description, title }: EmptyStateProps): JSX.Element => (
  <div className="rounded-xl border border-border-subtle bg-surface p-8 text-center shadow-panel">
    <h2 className="text-xl font-bold tracking-tight text-text-primary">{title}</h2>
    <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{description}</p>
    {action === undefined ? null : <div className="mt-6">{action}</div>}
  </div>
)
