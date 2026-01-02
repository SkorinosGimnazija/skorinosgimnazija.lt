import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import { api } from '../../api/api';
import { Post } from '../../components/post/Post';
import { Seo } from '../../components/seo/Seo';
import { DefaultLayout } from '../../layouts/DefaultLayout';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];

  for await (const locale of locales ?? []) {
    const rootMenus = await api.getMenus(locale);
    const allMenus = rootMenus.concat(rootMenus.flatMap((x) => x.children ?? []));

    for (const menu of allMenus) {
      if (!menu.children && !menu.isExternal) {
        paths.push('/' + locale + menu.url);
      }
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const [post, menus] = await Promise.all([
    api.getPostByPath(locale, params.pages),
    api.getMenus(locale),
  ]);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      menus,
    },
    revalidate: 60 * 60, // 1h
  };
};

const MenuPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, menus }) => {
  return (
    <DefaultLayout menus={menus}>
      <Seo post={post} />
      <Post post={post} hideDate />
    </DefaultLayout>
  );
};

export default MenuPage;