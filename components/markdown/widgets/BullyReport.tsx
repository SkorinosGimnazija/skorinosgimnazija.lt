import Script from 'next/script';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import { api } from '../../../api/api';
import { IBullyReport } from '../../../models/models';

export const BullyReport: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action: 'bullies' })
        .then((token) => {
          const formData = new FormData(form);
          const data = {
            ...Object.fromEntries(formData.entries()),
            captchaToken: token
          } as IBullyReport;

          api
            .reportBully(data)
            .then((response) => {
              if (!response) {
                toast.error('Serverio klaida. Pabandykite vėliau.');
                return;
              }

              if ('errors' in response) {
                toast.error(response.errors.map(x => x.reason).join('; '));
              } else {
                toast.success('Sėkmingai pranešta');
                form.reset();
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
          className="grid gap-6 mx-auto w-[600px] max-w-full rounded-xl border border-gray-400 p-4 sm:p-8"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
            <p className="text-center">Pranešti apie patyčias</p>
            <div>
              <label htmlFor="bully-victimName" className="block text-sm font-medium text-gray-700">
                Kas patyrė patyčias? *
              </label>
              <input
                type="text"
                name="victimName"
                id="bully-victimName"
                placeholder="Vardas, Pavardė, klasė"
                autoComplete="off"
                maxLength={256}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bully-bullyName" className="block text-sm font-medium text-gray-700">
                Kas tyčiojosi? *
              </label>
              <input
                type="text"
                name="bullyName"
                id="bully-bullyName"
                placeholder="Vardas, Pavardė, klasė"
                autoComplete="off"
                maxLength={256}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bully-observers" className="block text-sm font-medium text-gray-700">
                Kas stebėjo patyčias?
              </label>
              <input
                type="text"
                name="observers"
                id="bully-observers"
                autoComplete="off"
                maxLength={1024}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bully-location" className="block text-sm font-medium text-gray-700">
                Kur įvyko patyčios? *
              </label>
              <input
                type="text"
                name="location"
                id="bully-location"
                autoComplete="off"
                maxLength={128}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bully-date" className="block text-sm font-medium text-gray-700">
                Kada įvyko patyčios? *
              </label>
              <input
                type="date"
                name="date"
                id="bully-date"
                autoComplete="off"
                max={new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bully-details" className="block text-sm font-medium text-gray-700">
                Papasakok plačiau, kas nutiko *
              </label>
              <textarea
                id="bully-details"
                name="details"
                autoComplete="off"
                rows={3}
                maxLength={1024}
                required
                className="mt-1 block w-full resize-none rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="flex w-44 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm hover:bg-gray-200"
              >
                {loading ? <ImSpinner2 className="h-5 w-5 animate-spin" /> : 'Siųsti pranešimą'}
              </button>
            </div>
        </form>
      </div>
    </>
  );
};