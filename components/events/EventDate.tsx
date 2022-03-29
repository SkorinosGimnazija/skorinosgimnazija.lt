import React, { useEffect, useState, useRef } from 'react';
import { toEventLocalDateTime, toEventLocalDate } from '../../utils/dateFormat';

interface Props {
  date?: string;
  dateTime?: string;
}

export const EventDate: React.FC<Props> = ({ date, dateTime }) => {
  return (
    <time className="inline-block first-letter:uppercase" dateTime={date ?? dateTime}>
      {toEventLocalDate(date) ?? toEventLocalDateTime(dateTime)}
    </time>
  );
};
