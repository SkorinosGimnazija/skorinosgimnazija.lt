import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const { t, locale } = useTranslation();
  return (
    <footer className="mt-14 flex flex-wrap justify-around border-t-2 border-gray-300 py-14">
      <div className="max-w-sm">
        {locale === 'lt' && (
          <>
            <p>
              Gimnazija vykdo priešmokyklinio, pradinio, pagrindinio ir vidurinio ugdymo programas.
            </p>
            <p>Steigėjas – Vilniaus miesto savivaldybė</p>
            <p>Teisinė forma – biudžetinė įstaiga</p>
            <p>Mokomoji kalba - baltarusių</p>
            <p>Duomenys kaupiami ir saugomi Juridinių asmenų registre, kodas 191722390</p>
          </>
        )}
      </div>
      <address>
        <p>{t.name}</p>
        <p>{t.address}</p>
        <p>{t.phone}</p>
        <a className="text-blue-500" href={`mailto:${t.email}`}>
          {t.email}
        </a>
      </address>
    </footer>
  );
};
