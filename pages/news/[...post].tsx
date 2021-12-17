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

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const id = context.params.post?.[0];
    const posts = await fetch('http://localhost:5000/posts/public/' + id);
    if (!posts.ok) {
      return { notFound: true };
    }

    const json = await posts.json();

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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  const r = useRouter();

  if (r.isFallback) {
    return <>LOADING</>;
  }

  return (
    <div>
      POST
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};

export default Home;
