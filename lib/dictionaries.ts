import type de from '@/dictionaries/de.json'

export type Dictionary = typeof de

export type Locale = 'de' | 'en'

export const locales: Locale[] = ['de', 'en']
export const defaultLocale: Locale = 'de'

const dictionaries = {
  de: () => import('@/dictionaries/de.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
