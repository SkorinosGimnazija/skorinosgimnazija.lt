import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { api } from '../../api/api';
import { Post } from '../../components/post/Post';
import { Seo } from '../../components/seo/Seo';
import { DefaultLayout } from '../../layouts/DefaultLayout';

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  try {
    const [post, menus, banners] = await Promise.all([
      api.getPostById(params.post?.[0] ?? ''),
      api.getMenus(locale),
      api.getBanners(locale),
    ]);

    if (!post) {
      throw new Error('Not found');
    }

    return {
      props: {
        post,
        menus,
        banners,
        revalidate: 60 * 60, // 1h
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

const NewsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  menus,
  post,
  banners,
}) => {
  return (
    <DefaultLayout menus={menus} banners={banners}>
      <Seo post={post} />
      <Post post={post} />
    </DefaultLayout>
  );
};

export default NewsPage;
