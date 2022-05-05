import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
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
    const [post, menus] = await Promise.all([
      api.getPostById(params.post?.[0] ?? ''),
      api.getMenus(locale),
    ]);

    if (!post) {
      throw new Error('Not found');
    }

    return {
      props: {
        post,
        menus,
      },
      // revalidate: 60 * 60, // 1h
      revalidate: 5,
    };
  } catch (error) {
    return { notFound: true };
  }
};

const NewsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ menus, post }) => {
  return (
    <DefaultLayout menus={menus}>
      <Seo post={post} />
      <Post post={post} />
    </DefaultLayout>
  );
};

export default NewsPage;
