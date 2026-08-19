import { EventItem } from '@/components/events/event-item'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ItemGroup } from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getEvents } from '@/lib/api'
import { SiGoogle } from '@icons-pack/react-simple-icons'
import { clsx } from 'clsx'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

export async function Events() {
  const locale = await getLocale()
  const events = await getEvents(locale)

  if (!events.length) {
    return null
  }

  const t = await getTranslations('calendar')

  return (
    <Card className={clsx(
      'mb-8 py-4 shadow-sm',
      'transition-shadow duration-200 hover:shadow-lg',
    )}>
      <CardContent className="p-0">
        <ScrollArea className="h-85 px-4">
          <ItemGroup className="gap-2">
            {events.map((x) => <EventItem key={x.id} event={x} />)}
          </ItemGroup>
        </ScrollArea>
      </CardContent>

      <CardFooter className="justify-end">
        <a
          className={buttonVariants({ variant: 'link', size: 'icon' })}
          href={`https://calendar.google.com/calendar/r?cid=${t('id')}@group.calendar.google.com`}
          title={t('add')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGoogle className="size-5" />
        </a>
      </CardFooter>
    </Card>
  )
}