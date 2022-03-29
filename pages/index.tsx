import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { api } from '../api/api';
import { PostsList } from '../components/post/PostsList';
import { Seo } from '../components/seo/Seo';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { IPost } from '../models/models';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [posts, menus, banners, events] = await Promise.all([
    api.getPosts(locale),
    api.getMenus(locale),
    api.getBanners(locale),
    api.getEvents(0),
  ]);

  return {
    props: {
      posts,
      menus,
      banners,
      events,
      revalidate: 60 * 60, // 1h
    },
  };
};

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  menus,
  banners,
  events,
}) => {
  return (
    <>
      <DefaultLayout menus={menus} banners={banners} events={events}>
        <Seo />
        <PostsList posts={posts} />
      </DefaultLayout>
    </>
  );
};

export default HomePage;
