import { routing } from '@/i18n/routing'
import { capitalize } from '@/lib/utils'

const FORCED_TIME_ZONE = 'Europe/Vilnius'

const newsDateFormat = Object.fromEntries(
  routing.locales.map(locale => [
    locale,
    new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: FORCED_TIME_ZONE,
    }),
  ]),
)

const eventDateFormat = Object.fromEntries(
  routing.locales.map(locale => [
    locale,
    new Intl.DateTimeFormat(locale, {
      month: 'long',
      day: 'numeric',
      timeZone: FORCED_TIME_ZONE,
    }),
  ]),
)

const eventDateTimeFormat = Object.fromEntries(
  routing.locales.map(locale => [
    locale,
    new Intl.DateTimeFormat(locale, {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: FORCED_TIME_ZONE,
    }),
  ]),
)

export function toLocalDate(date: string, locale: string) {
  return newsDateFormat[locale].format(new Date(date))
}

export function toEventLocalDate(date: string, locale: string) {
  return capitalize(eventDateFormat[locale].format(new Date(date)))
}

export function toEventLocalDateTime(date: string, locale: string) {
  return capitalize(eventDateTimeFormat[locale].format(new Date(date)))
}