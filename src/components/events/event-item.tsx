import { EventDate } from '@/components/events/event-date'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import type { EventResponse } from '@/lib/models'

interface Props {
  event: EventResponse
}

export function EventItem({ event }: Props) {
  return (
    <Item variant="outline" role="listitem">
      <ItemContent>
        <ItemTitle className="text-base font-normal">{event.title}</ItemTitle>
        <ItemDescription className="text-sm text-muted-foreground">
          <EventDate allDay={event.allDay} startDate={event.startDate} endDate={event.endDate} />
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}