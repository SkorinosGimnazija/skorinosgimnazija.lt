import React, { useEffect, useState, useRef } from 'react';
import { toEventLocalDateTime, toEventLocalDate } from '../../utils/dateFormat';
import { EventDate } from './EventDate';

interface Props {
  start: string;
  end: string;
}

export const EventDateRange: React.FC<Props> = ({ start, end }) => {
  return (
    <>
      <EventDate date={start} />
      <span> - </span>
      <EventDate date={end} />
    </>
  );
};
