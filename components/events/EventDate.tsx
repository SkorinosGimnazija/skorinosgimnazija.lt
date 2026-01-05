import React from 'react';
import { toEventLocalDate, toEventLocalDateTime } from '../../utils/dateFormat';

interface Props {
  date: string;
  allDay: boolean;
}

export const EventDate: React.FC<Props> = ({ date, allDay }) => {
  return (
    <time dateTime={date}>
      {allDay ? toEventLocalDate(date) : toEventLocalDateTime(date)}
    </time>
  );
};