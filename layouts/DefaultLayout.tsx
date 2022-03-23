import { GetStaticProps } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import { BannerList } from '../components/banner/BannerList';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { MenuList } from '../components/menu/MenuList';
import { IBanner, IMenu } from '../models/models';

interface Props {
  menus: IMenu[];
  banners: IBanner[];
}
import q from '../assets/bg/qq.svg';
import qq from '../assets/bg/qqq.svg';

export const DefaultLayout: React.FC<Props> = ({ children, menus, banners }) => {
  return (
    <>
      <Header />
      <section className="container relative -mt-12 flex flex-wrap">
        <main className="lg:flex-1">{children}</main>
        <aside className="w-full p-4 lg:max-w-sm">
          <MenuList menus={menus} />
          <BannerList banners={banners} />
        </aside>
      </section>
      <section className="bg-gray-200">
        <Footer />
      </section>
    </>
  );
};
