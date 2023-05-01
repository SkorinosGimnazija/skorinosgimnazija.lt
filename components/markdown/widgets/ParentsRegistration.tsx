import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { api } from '../../../api/api';
import { IAppointmentDate, IAppointmentHost } from '../../../models/models';
import { toEventLocalDateTime } from '../../../utils/dateFormat';

export const ParentsRegistration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('parents-online');

  const [teacher, setTeacher] = useState('');
  const [teachers, setTeachers] = useState<IAppointmentHost[]>([]);

  const [date, setDate] = useState<'' | number>('');
  const [dates, setDates] = useState<IAppointmentDate[]>([]);
  const [registeredDates, setRegisteredDates] = useState<number[]>([]);
  const availableDates = dates.filter((x) => !registeredDates.includes(x.id));

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (!type) return;

    setDate('');
    api.getAppointmentTeachers(type).then((x) => setTeachers(x));
  }, [type]);

  useEffect(() => {
    if (!teacher) return;

    setDate('');
    api.getAppointmentDates(type, teacher).then((x) => setDates(x));
  }, [teacher, type]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action: 'parents' })
        .then((token) => {
          api
            .registerAppointment({
              captchaToken: token,
              dateId: Number(date),
              userName: teacher,
              attendeeEmail: emailRef.current.value,
              attendeeName: nameRef.current.value,
            })
            .then((response) => {
              if (!response) {
                toast.error('Serverio klaida. Pabandykite vėliau.');
                return;
              }

              if (response.errors) {
                Object.values(response.errors).forEach((err) => {
                  toast.error(err.join(' '));
                });
              } else {
                toast.success('Registracija sėkminga');
                setRegisteredDates((x) => [...x, Number(date)]);
                setTeacher('');
                setDate('');
              }
            })
            .finally(() => {
              setLoading(false);
            });
        });
    });
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY}`}
        strategy="lazyOnload"
      />

      <div className="my-8">
        <form
          className="mx-auto w-[500px] max-w-full rounded-xl border border-gray-400 p-4 sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col justify-center gap-4">
            <div>
              <label htmlFor="reg-type" className="block text-sm font-medium text-gray-700">
                Tipas *
              </label>
              <select
                id="reg-type"
                name="type"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                onChange={(x) => setType(x.target.value)}
                value={type}
              >
                <option value="parents-online">Nuotolinis susitikimas (Google Meet)</option>
                <option value="parents-offline">Kontaktinis susitikimas (gimnazijoje)</option>
              </select>
            </div>

            <div>
              <label htmlFor="reg-teacher" className="block text-sm font-medium text-gray-700">
                Mokytojas *
              </label>
              <select
                id="reg-teacher"
                name="teacher"
                required
                onChange={(x) => setTeacher(x.target.value)}
                value={teacher}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              >
                <option disabled hidden></option>
                {teachers.map((x) => {
                  return (
                    <option key={x.userName} value={x.userName}>
                      {x.displayName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label htmlFor="reg-time" className="block text-sm font-medium text-gray-700">
                Laikas *
              </label>
              <select
                id="reg-time"
                name="time"
                required
                disabled={!Boolean(teacher)}
                onChange={(x) => setDate(Number(x.target.value))}
                value={date}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              >
                <option disabled hidden></option>
                {availableDates.length === 0 ? (
                  <option disabled value="-1">
                    Laisvo laiko nėra
                  </option>
                ) : (
                  availableDates.map((x) => {
                    return (
                      <option key={x.id} value={x.id}>
                        {toEventLocalDateTime(x.date)}
                      </option>
                    );
                  })
                )}
              </select>
            </div>

            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700">
                Vardas *
              </label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="reg-name"
                autoComplete="name"
                maxLength={256}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                El. paštas (@gmail.com) *
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="reg-email"
                autoComplete="email"
                maxLength={256}
                required
                pattern=".+@gmail.com"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="mt-4 flex justify-center sm:mt-8">
              <button
                disabled={loading}
                type="submit"
                className="flex w-44 items-center justify-center rounded-lg border border-gray-300 bg-white bg-opacity-70 px-5 py-3 text-sm backdrop-blur-lg hover:bg-gray-200"
              >
                {loading ? <ImSpinner2 className="h-5 w-5 animate-spin" /> : 'Registruotis'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
