import React, { useEffect, useState, useRef } from 'react';
import { IEvent } from '../../models/models';
import { toEventLocalDateTime, toEventLocalDate } from '../../utils/dateFormat';
import { EventDate } from './EventDate';
import { EventDateRange } from './EventDateRange';

interface Props {
  event: IEvent;
}

export const EventItem: React.FC<Props> = ({ event }) => {
  const multipleDays = event.startDate && event.startDate !== event.endDate;

  return (
    <div className="mb-4 border-l-[6px] border-yellow-300 py-1 px-4 last:mb-0">
      <p>{event.title}</p>
      <p className="mt-1 text-sm text-gray-500">
        {multipleDays ? (
          <EventDateRange start={event.startDate} end={event.endDate} />
        ) : (
          <EventDate date={event.startDate} dateTime={event.startDateTime} />
        )}
      </p>
    </div>
  );
};
