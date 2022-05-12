import React from 'react';
import { BannerList } from '../components/banner/BannerList';
import { EventList } from '../components/events/EventList';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { MenuList } from '../components/menu/MenuList';
import { IBanner, IEvent, IMenu } from '../models/models';

interface Props {
  menus: IMenu[];
  banners?: IBanner[];
  events?: IEvent[];
}

export const DefaultLayout: React.FC<Props> = ({ children, menus, banners, events }) => {
  // useEffect(() => {
  //   const animation = gsap.fromTo(
  //     'body',
  //     {
  //       backgroundPositionY: `0px`,
  //       ease: 'none',
  //       scrollTrigger: {
  //         trigger: 'html',
  //         scrub: 4,
  //       },
  //     },
  //     {
  //       backgroundPositionY: `-${window.innerHeight / 2}px`,
  //       ease: 'none',
  //       scrollTrigger: {
  //         trigger: 'html',
  //         scrub: 4,
  //       },
  //     }
  //   );

  //   () => {
  //     animation.kill();
  //   };
  // }, []);

  return (
    <>
      <Header />
      <section className="container relative -mt-12 grid grid-cols-7 gap-8 xl:px-28">
        <main className="col-span-full w-full lg:col-span-5">{children}</main>
        <aside className="col-span-full row-start-1 w-full lg:col-span-2 lg:row-start-auto">
          <MenuList menus={menus} />
          <EventList events={events} />
          <BannerList banners={banners} />
        </aside>
      </section>
      <section className="bg-gray-200">
        <Footer />
      </section>
    </>
  );
};
