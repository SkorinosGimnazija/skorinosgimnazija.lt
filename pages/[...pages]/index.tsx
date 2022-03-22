import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { api } from '../../api/api';
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
      api.getPostByPath(locale, params.pages),
      api.getMenus(locale),
    ]);

    if (!post) {
      throw new Error('Not found');
    }

    return {
      props: {
        post,
        menus,
        revalidate: 60 * 60, // 1h
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Home1: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, menus }) => {
  return (
    <DefaultLayout menus={menus}>
      <div>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    </DefaultLayout>
  );
};

export default Home1;
