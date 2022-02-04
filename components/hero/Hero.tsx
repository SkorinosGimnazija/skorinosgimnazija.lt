import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import HeaderImage from '../../assets/images/header.jpg';

export const Hero: React.FC = () => {
  return (
    <>
      <div style={{ position: 'relative', height: '400px' }}>
        <Image
          src={HeaderImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Vilniaus Pranciškaus Skorinos gimnazija"
        />
      </div>
    </>
  );
};
