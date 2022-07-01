import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { useTranslation } from '../../hooks/useTranslation';

export const Footer: React.FC = () => {
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
        <div>
          <ul className="mb-2 flex items-center justify-center gap-2 md:justify-end">
            <li>
              <a
                href="https://www.facebook.com/Vilniaus-Pranci%C5%A1kaus-Skorinos-gimnazija-108554757217249/"
                title="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="h-7 w-7 rounded-full hover:text-blue-600" />
              </a>
            </li>
          </ul>
          <address className="text-center md:text-right">
            <p>{t.schoolName}</p>
            <p>{t.schoolAdress}</p>
            <p>{t.schoolPhone}</p>
            <a className="text-blue-500" href={`mailto:${t.schoolEmail}`}>
              {t.schoolEmail}
            </a>
          </address>
        </div>
      </div>
      <p className="tetx-sm mb-10 text-center text-gray-500">
        &copy; {new Date().getFullYear()} {t.schoolName}
      </p>
    </footer>
  );
};
