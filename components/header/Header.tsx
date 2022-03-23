import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import HeroImage from '../../assets/images/hero.jpg';
import LogoImage from '../../assets/images/logo3.png';
import { useTranslation } from '../../hooks/useTranslation';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative h-[350px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
    >
      <div className="relative z-10 w-full bg-[rgba(0,0,0,0.1)] backdrop-blur-sm">
        <header className="flex min-h-[4.2rem] flex-wrap items-center px-4 text-white">
          <h1 className="text-shadow mr-4 min-w-fit font-serif text-2xl">
            <Link href="/">
              <a>{t.name}</a>
            </Link>
          </h1>
          <div className="text-shadow flex flex-1 justify-end gap-3 text-lg">
            <ul className="flex gap-3">
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
            <span>A</span>
            <span>B</span>
          </div>
        </header>
      </div>
      <img
        className="absolute top-1/2 left-1/2 -translate-y-1/3 -translate-x-1/2 lg:left-52"
        src={LogoImage.src}
        alt="logo"
        width="175"
        height="175"
      />
    </section>
  );
};
