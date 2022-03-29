import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IEvent } from '../../models/models';
import { EventItem } from './EventItem';

interface Props {
  events?: IEvent[];
}

export const EventList: React.FC<Props> = ({ events }) => {
  const { locale, t } = useTranslation();

  if (!events?.length || locale !== 'lt') {
    return null;
  }

  return (
    <div
      id="events"
      className="my-8 hidden max-h-96 overflow-y-scroll rounded-lg bg-white bg-opacity-80 py-4 shadow-md backdrop-blur-lg lg:block"
    >
      {events.map((x) => {
        return <EventItem key={x.id} event={x} />;
      })}
    </div>
  );
};
