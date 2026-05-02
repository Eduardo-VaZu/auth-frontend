import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { env } from '@/shared/lib/env'
import { buildSeoUrl } from '@/shared/utils/seo'

const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
const NO_INDEX_ROBOTS = 'noindex, nofollow'
const STRUCTURED_DATA_ID = 'app-seo-structured-data'

const LOCALE_BY_LANGUAGE = {
  en: 'en_US',
  es: 'es_ES',
} as const

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

const upsertMeta = (selector: string, attributeName: 'name' | 'property', attributeValue: string, content: string): void => {
  let metaTag = document.head.querySelector<HTMLMetaElement>(selector)

  if (metaTag === null) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute(attributeName, attributeValue)
    document.head.append(metaTag)
  }

  metaTag.setAttribute('content', content)
}

const upsertLink = (rel: string, href: string): void => {
  let linkTag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (linkTag === null) {
    linkTag = document.createElement('link')
    linkTag.setAttribute('rel', rel)
    document.head.append(linkTag)
  }

  linkTag.setAttribute('href', href)
}

const upsertStructuredData = (structuredData?: StructuredData): void => {
  const existingScript = document.head.querySelector<HTMLScriptElement>(`script#${STRUCTURED_DATA_ID}`)

  if (structuredData === undefined) {
    existingScript?.remove()

    return
  }

  const scriptTag = existingScript ?? document.createElement('script')

  scriptTag.id = STRUCTURED_DATA_ID
  scriptTag.type = 'application/ld+json'
  scriptTag.text = JSON.stringify(structuredData)

  if (existingScript === null) {
    document.head.append(scriptTag)
  }
}



export interface SeoProps {
  title: string
  description: string
  path?: string
  index?: boolean
  type?: 'website' | 'article'
  structuredData?: StructuredData
}

export const Seo = ({
  title,
  description,
  path,
  index = true,
  type = 'website',
  structuredData,
}: SeoProps): JSX.Element | null => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const language = i18n.resolvedLanguage ?? i18n.language ?? 'en'
    const pageTitle = title === env.appName ? title : `${title} | ${env.appName}`
    const canonicalUrl = buildSeoUrl(path ?? window.location.pathname)
    const robotsContent = index ? DEFAULT_ROBOTS : NO_INDEX_ROBOTS
    const ogLocale = LOCALE_BY_LANGUAGE[language as keyof typeof LOCALE_BY_LANGUAGE] ?? LOCALE_BY_LANGUAGE.en

    document.title = pageTitle
    document.documentElement.lang = language

    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[name="robots"]', 'name', 'robots', robotsContent)
    upsertLink('canonical', canonicalUrl)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', env.appName)
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', ogLocale)

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

    upsertStructuredData(index ? structuredData : undefined)
  }, [description, i18n.language, i18n.resolvedLanguage, index, path, structuredData, title, type])

  return null
}
