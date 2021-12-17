import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const path = encodeURIComponent('/' + (context.params.pages as string[]).join('/'));
    const menu = await fetch('http://localhost:5000/menus/public/' + path);
    if (!menu.ok) {
      return { notFound: true };
    }

    const json = await menu.json();

    return {
      props: {
        post: json,
        revalidate: 60 * 60,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

const Home1: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  return (
    <div>
      MENU
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default Home1;
