import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { api } from '../api/api';
import { PostsList } from '../components/post/PostsList';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { IPost } from '../models/models';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [posts, menus, banners] = await Promise.all([
    api.getPosts(locale),
    api.getMenus(locale),
    api.getBanners(locale),
  ]);

  return {
    props: {
      posts,
      menus,
      banners,
      revalidate: 60 * 60, // 1h
    },
  };
};

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  menus,
  banners,
}) => {
  return (
    <>
      <DefaultLayout menus={menus} banners={banners}>
        <PostsList posts={posts} />
        <PostsList posts={posts} />
        <PostsList posts={posts} />
      </DefaultLayout>
    </>
  );
};

export default HomePage;
