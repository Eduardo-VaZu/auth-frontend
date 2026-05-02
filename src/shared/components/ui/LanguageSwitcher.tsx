import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/Button'

export interface LanguageSwitcherProps {
  tone?: 'light' | 'dark'
}

export const LanguageSwitcher = (): JSX.Element => {
  const { i18n, t } = useTranslation()

  const toggleLanguage = async (): Promise<void> => {
    const currentLang = i18n.resolvedLanguage || i18n.language
    const nextLang = currentLang.startsWith('es') ? 'en' : 'es'

    await i18n.changeLanguage(nextLang)
  }

  const displayLang = (i18n.resolvedLanguage || i18n.language).startsWith('es') ? 'ES' : 'EN'

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-md px-3.5 py-2"
      onClick={toggleLanguage}
      aria-label={t('common.switchLanguage')}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="text-[11px] font-bold uppercase tracking-[0.1em]">{displayLang}</span>
    </Button>
  )
}
