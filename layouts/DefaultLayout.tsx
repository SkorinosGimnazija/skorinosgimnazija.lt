import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../components/header/Header';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
};
