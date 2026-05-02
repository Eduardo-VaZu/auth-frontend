import { cn } from '@/shared/utils/cn'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border-subtle bg-surface shadow-panel',
        className,
      )}
      {...props}
    />
  )
}
