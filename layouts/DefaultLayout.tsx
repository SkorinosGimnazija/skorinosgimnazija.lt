import { GetStaticProps } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import { BannerList } from '../components/banner/BannerList';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { MenuList } from '../components/menu/MenuList';
import { IBanner, IEvent, IMenu } from '../models/models';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import { FooterWave } from '../components/footer/FooterWave';
import { EventList } from '../components/events/EventList';

interface Props {
  menus: IMenu[];
  banners: IBanner[];
  events: IEvent[];
}

export const DefaultLayout: React.FC<Props> = ({ children, menus, banners, events }) => {
  useEffect(() => {
    gsap.fromTo(
      'body',
      {
        backgroundPositionY: `0px`,
        ease: 'none',
        // scrollTrigger: {
        //   // trigger: 'html',
        //   scrub: 1,
        // },
      },
      {
        backgroundPositionY: `-500px`,
        ease: 'none',
        scrollTrigger: {
          // trigger: 'html',
          scrub: 3,
        },
      }
    );
  }, []);

  return (
    <>
      <Header />
      <section className="container relative -mt-12 flex flex-col-reverse flex-wrap lg:flex-row">
        <main className="lg:flex-1">{children}</main>
        <aside className="w-full p-4 lg:max-w-sm">
          <MenuList menus={menus} />
          <EventList events={events} />
          <BannerList banners={banners} />
        </aside>
      </section>
      {/* <FooterWave /> */}
      <section className="bg-gray-200">
        <Footer />
      </section>
    </>
  );
};
