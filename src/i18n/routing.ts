import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['lt', 'be', 'en'],
  defaultLocale: 'lt',
  localeDetection: false,
  localePrefix: 'as-needed',
})