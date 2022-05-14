import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaSitemap } from 'react-icons/fa';
import HeroImage from '../../assets/images/hero.jpg';
import LogoImage from '../../assets/images/logo.png';
import { useTranslation } from '../../hooks/useTranslation';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative h-[450px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
    >
      <div className="relative z-10 w-full bg-black bg-opacity-10 backdrop-blur-sm">
        <header className="flex min-h-[4.2rem] flex-wrap items-center px-4 text-white">
          <h1 className="text-shadow mr-4 min-w-fit font-serif text-2xl lg:text-3xl">
            <Link href="/">
              <a>{t.schoolName}</a>
            </Link>
          </h1>
          <div className="text-shadow flex flex-1 justify-end gap-3 text-lg">
            <ul className="flex items-center gap-3">
              <li>
                <Link href={'/sitemap'}>
                  <a title={t.sitemap}>
                    <FaSitemap />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/" locale="lt">
                  <a>LT</a>
                </Link>
              </li>
              <li>
                <Link href="/" locale="by">
                  <a>BY</a>
                </Link>
              </li>
              <li>
                <Link href="/" locale="en">
                  <a>EN</a>
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
      <Link href="/">
        <a title={t.schoolName} tabIndex={-1}>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/3 -translate-x-1/2 lg:left-80">
            <Image priority src={LogoImage} width={150} height={150} alt={t.schoolName} />
          </div>
        </a>
      </Link>
    </section>
  );
};
