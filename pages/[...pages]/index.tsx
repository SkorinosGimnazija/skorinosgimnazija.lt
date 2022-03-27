import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import { api } from '../../api/api';
import { Post } from '../../components/post/Post';
import { DefaultLayout } from '../../layouts/DefaultLayout';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];

  for await (const locale of locales ?? []) {
    const rootMenus = await api.getMenus(locale);
    const allMenus = rootMenus.concat(rootMenus.flatMap((x) => x.childMenus));

    for (const menu of allMenus) {
      if (!menu.childMenus?.length && !menu.url?.length) {
        paths.push('/' + locale + menu.path);
      }
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  try {
    const [post, menus, banners] = await Promise.all([
      api.getPostByPath(locale, params.pages),
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

const MenuPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  menus,
  banners,
}) => {
  return (
    <DefaultLayout menus={menus} banners={banners}>
      <Post post={post} hideDate />
    </DefaultLayout>
  );
};

export default MenuPage;
