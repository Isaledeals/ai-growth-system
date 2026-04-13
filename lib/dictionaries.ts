export type Locale = 'de' | 'en'

export const locales: Locale[] = ['de', 'en']
export const defaultLocale: Locale = 'de'

const dictionaries = {
  de: () => import('@/lib/dictionaries/de').then((m) => m.default),
  en: () => import('@/lib/dictionaries/en').then((m) => m.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
