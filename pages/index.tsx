import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Post } from '../components/post/Post';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const posts = await fetch(`http://localhost:5000/posts/public/${context.locale}/all`);
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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <>
      <DefaultLayout>
        {posts.map((x) => {
          return <Post key={x.id} data={x} />;
        })}
      </DefaultLayout>
    </>
  );
};

export default Home;
