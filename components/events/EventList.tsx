import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner2 } from 'react-icons/im';
import { useInView } from 'react-intersection-observer';
import { api } from '../../api/api';
import { useTranslation } from '../../hooks/useTranslation';
import { IEvent } from '../../models/models';
import { EventItem } from './EventItem';

interface Props {
  events?: IEvent[];
}

export const EventList: React.FC<Props> = ({ events }) => {
  const { locale } = useTranslation();
  const [allEvents, setAllEvents] = useState(events);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const weekNumber = useRef(1);

  const { ref } = useInView({
    onChange: async (inView) => {
      if (inView && hasMoreEvents && !eventsLoading) {
        setEventsLoading(true);

        const nextEvents = await api.getEvents(weekNumber.current++);
        const currentEvents = allEvents.map((x) => x.id);
        const newEvents = nextEvents.filter((x) => !currentEvents.includes(x.id));

        if (newEvents.length === 0) {
          setHasMoreEvents(false);
        }

        setAllEvents((x) => [...x, ...newEvents]);
        setEventsLoading(false);
      }
    },
  });

  if (!events?.length || locale !== 'lt') {
    return null;
  }

  return (
    <div className="my-8 hidden rounded-lg bg-white py-4 shadow-md lg:block">
      <div id="events" className="max-h-96 overflow-y-auto" tabIndex={0}>
        {allEvents.map((x) => {
          return <EventItem key={x.id} event={x} />;
        })}
        {hasMoreEvents && (
          <div className="flex justify-center overflow-hidden" ref={ref}>
            <ImSpinner2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Link
          href="https://calendar.google.com/calendar/r?cid=c_2kn8sdmcsm9mm1bqbk3s1lfncg@group.calendar.google.com"
          className="mx-4 mt-2 block text-2xl"
          target="_blank"
          title="Pridėti prie „Google“ kalendoriaus"
        >
          <FcGoogle />
        </Link>
      </div>
    </div>
  );
};