import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const { t, locale } = useTranslation();
  return (
    <footer className="relative mt-20 flex flex-col">
      <div className="flex flex-col items-center gap-8 py-20 md:flex-row md:justify-around">
        <div className="max-w-sm text-center md:text-left">
          {locale === 'lt' && (
            <>
              <p>
                Gimnazija vykdo priešmokyklinio, pradinio, pagrindinio ir vidurinio ugdymo
                programas.
              </p>
              <p>Steigėjas – Vilniaus miesto savivaldybė</p>
              <p>Teisinė forma – biudžetinė įstaiga</p>
              <p>Mokomoji kalba - baltarusių</p>
              <p>Duomenys kaupiami ir saugomi Juridinių asmenų registre, kodas 191722390</p>
            </>
          )}
        </div>
        <address className="text-center md:text-right">
          <p>{t.name}</p>
          <p>{t.address}</p>
          <p>{t.phone}</p>
          <a className="text-blue-500" href={`mailto:${t.email}`}>
            {t.email}
          </a>
        </address>
      </div>
      <p className="tetx-sm mb-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} {t.name}
      </p>
    </footer>
  );
};
