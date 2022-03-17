import React from 'react';
import HeroImage from '../../assets/images/hero.jpg';
import LogoImage from '../../assets/images/logo3.png';

export const Header: React.FC = () => {
  return (
    <section
      className="relative h-[350px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
    >
      <div className="backdrop-blur-sm">
        <header className="flex min-h-[5rem] flex-wrap items-center px-4 text-white">
          <h1 className="text-shadow mr-4 min-w-fit text-2xl">
            Vilniaus Pranciškaus Skorinos gimnazija
          </h1>
          <div className="text-shadow flex flex-1 justify-end gap-3 text-lg">
            <ol className="flex gap-3">
              <li>LT</li>
              <li>BY</li>
              <li>EN</li>
            </ol>
            <span>A</span>
            <span>B</span>
          </div>
        </header>
      </div>
      <img
        className="absolute top-1/2 left-1/2 -translate-y-1/3 -translate-x-1/2 sm:left-52"
        src={LogoImage.src}
        alt="logo"
        width="175"
        height="175"
      />
    </section>
  );
};
