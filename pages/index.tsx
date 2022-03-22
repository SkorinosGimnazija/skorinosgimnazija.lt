import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { api } from '../api/api';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Post } from '../models/models';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [posts, menus] = await Promise.all([api.getPosts(locale), api.getMenus(locale)]);

  return {
    props: {
      posts,
      menus,
      revalidate: 60 * 60, // 1h
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, menus }) => {
  return (
    <>
      <DefaultLayout menus={menus}></DefaultLayout>
    </>
  );
};

export default Home;
