import React from 'react';
import { toEventLocalDate, toEventLocalDateTime } from '../../utils/dateFormat';

interface Props {
  date?: string;
  dateTime?: string;
}

export const EventDate: React.FC<Props> = ({ date, dateTime }) => {
  return (
    <time dateTime={date ?? dateTime}>
      {toEventLocalDate(date) ?? toEventLocalDateTime(dateTime)}
    </time>
  );
};
