import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IEvent } from '../../models/models';
import { EventItem } from './EventItem';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface Props {
  events?: IEvent[];
}

export const EventList: React.FC<Props> = ({ events }) => {
  const { locale, t } = useTranslation();

  if (!events?.length || locale !== 'lt') {
    return null;
  }

  return (
    <div className="my-8 hidden rounded-lg bg-white bg-opacity-80 py-4 shadow-md backdrop-blur-lg lg:block">
      <div id="events" className="max-h-96 overflow-y-auto">
        {events.map((x) => {
          return <EventItem key={x.id} event={x} />;
        })}
      </div>
      <div className="flex justify-end">
        <Link href="https://calendar.google.com/calendar/r?cid=c_2kn8sdmcsm9mm1bqbk3s1lfncg@group.calendar.google.com">
          <a title="Pridėti prie „Google“ kalendoriaus" className="mx-4 mt-2 block text-2xl">
            <FcGoogle />
          </a>
        </Link>
      </div>
    </div>
  );
};
