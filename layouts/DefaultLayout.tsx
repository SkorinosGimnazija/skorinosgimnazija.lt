import React, { useEffect, useState, useRef } from 'react';
import { Hero } from '../components/hero/Hero';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Hero />
      <main className="container">{children}</main>
    </>
  );
};
