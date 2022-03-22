import { GetStaticProps } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../components/header/Header';
import { MenuList } from '../components/menu/MenuList';
import { Menu } from '../models/models';

interface Props {
  menus: Menu[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const posts = await fetch(`http://localhost:5000/posts/public/${context.locale}/al1l`);
    if (!posts.ok) {
      console.log(posts);
      return { notFound: true };
    }

    const json = await posts.json();

    return {
      props: {
        posts: json,
        revalidate: 60 * 60,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const DefaultLayout: React.FC<Props> = ({ children, menus }) => {
  return (
    <>
      <Header />
      <section className="container flex">
        <main className="flex-1">{children}</main>
        <aside className="p-4">
          <MenuList menus={menus} />
        </aside>
      </section>
    </>
  );
};
