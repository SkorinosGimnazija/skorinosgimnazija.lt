import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import { api } from '../api/api';
import { Seo } from '../components/seo/Seo';
import { Sitemap } from '../components/sitemap/Sitemap';
import { useTranslation } from '../hooks/useTranslation';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [menus] = await Promise.all([api.getMenus(locale!)]);

  return {
    props: {
      menus,
    },
    revalidate: 60 * 60 * 24, // 24h
  };
};

const SitemapPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ menus }) => {
  const { t } = useTranslation();

  return (
    <DefaultLayout menus={menus}>
      <Seo title={t.sitemap} />
      <Sitemap menus={menus} />
    </DefaultLayout>
  );
};

export default SitemapPage;