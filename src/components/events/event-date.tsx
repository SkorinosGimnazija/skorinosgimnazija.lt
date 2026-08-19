import { toEventLocalDate, toEventLocalDateTime } from '@/lib/dates'
import { getLocale } from 'next-intl/server'

interface Props {
  allDay: boolean,
  startDate: string,
  endDate: string
}

export async function EventDate({ allDay, startDate, endDate }: Props) {
  const locale = await getLocale()
  const isMultiDay = allDay && startDate !== endDate

  if (isMultiDay) {
    return (
      <>
        <time dateTime={startDate}>
          {toEventLocalDate(startDate, locale)}
        </time>
        {' - '}
        <time dateTime={endDate}>
          {toEventLocalDate(endDate, locale)}
        </time>
      </>
    )
  }

  return (
    <time dateTime={startDate}>
      {allDay ? toEventLocalDate(startDate, locale) : toEventLocalDateTime(startDate, locale)}
    </time>
  )
}