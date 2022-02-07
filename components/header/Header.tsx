import { GetStaticProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import HeroImage from '../../assets/images/hero.jpg';
import LogoImage from '../../assets/images/logo3.png';

export const Header: React.FC = () => {
  return (
    <header className="relative h-[350px] w-full">
      <div className="absolute flex min-h-[4rem] w-full flex-wrap items-center px-4 text-white backdrop-blur-sm">
        <h1 className="text-shadow mr-4 min-w-fit text-xl">
          Vilniaus Pranciškaus Skorinos gimnazija
        </h1>
        <div className="text-shadow flex flex-1 justify-end gap-3 text-lg">
          <ul className="flex gap-3">
            <li>LT</li>
            <li>BY</li>
            <li>EN</li>
          </ul>
          <span>A</span>
          <span>B</span>
        </div>
      </div>
      {/* <span className="absolute top-1/2 left-1/2 -translate-y-1/3 -translate-x-1/2 sm:left-52">
        <Image src={LogoImage} alt="logo" width="150" height="150" quality="100" />
      </span> */}
      <img
        className="absolute top-1/2 left-1/2 -translate-y-1/3 -translate-x-1/2 sm:left-52"
        src={LogoImage.src}
        alt="logo"
        width="150"
        height="150"
      />
      <img
        className="h-full w-full object-cover"
        src={HeroImage.src}
        alt="Vilniaus Pranciškaus Skorinos gimnazija"
      />
      {/* <Image
          src={HeroImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Vilniaus Pranciškaus Skorinos gimnazija"
        /> */}
    </header>
  );
};
