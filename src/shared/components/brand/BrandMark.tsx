import { cn } from '@/shared/utils/cn'

export interface BrandMarkProps {
  className?: string
}

export const BrandMark = ({ className }: BrandMarkProps): JSX.Element => (
  <div
    className={cn(
      'inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,#141925_0%,#0d1017_100%)] shadow-[0_18px_48px_-28px_rgba(124,108,255,0.65)]',
      className,
    )}
  >
    <svg viewBox="0 0 64 64" className="h-[65%] w-[65%]" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brandmark-shield" x1="20" y1="12" x2="44" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9385FF" />
          <stop offset="1" stopColor="#5A49E6" />
        </linearGradient>
      </defs>
      <path d="M32 10 46 15.5V28c0 10.2-5.5 19.7-14 24-8.5-4.3-14-13.8-14-24V15.5L32 10Z" fill="url(#brandmark-shield)" />
      <path
        d="M35.75 20v17.5c0 3.4-.85 5.95-2.55 7.65-1.7 1.7-4.15 2.55-7.35 2.55-2.9 0-5.35-.9-7.35-2.7l3.85-4.45c1.25 1 2.45 1.5 3.6 1.5 2.45 0 3.68-1.58 3.68-4.75V20h6.12Z"
        fill="#F7F8FF"
      />
    </svg>
  </div>
)
