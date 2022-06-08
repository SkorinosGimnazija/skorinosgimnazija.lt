import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { api } from '../api/api';
import NotFoundPic from '../assets/images/404.png';
import { Article } from '../components/article/Article';
import { Seo } from '../components/seo/Seo';
import { useTranslation } from '../hooks/useTranslation';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [menus] = await Promise.all([api.getMenus(locale)]);

  return {
    props: { menus },
    revalidate: 60 * 60, // 1h
  };
};

const NotFound404Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ menus }) => {
  const { t } = useTranslation();

  return (
    <DefaultLayout menus={menus}>
      <Seo title={t.pageNotFound} />
      <Article title={`404 ${t.pageNotFound}`}>
        <div className="flex justify-center">
          <Image
            src={NotFoundPic}
            alt={t.pageNotFound}
            width="400px"
            height="400px"
            loading="eager"
          />
        </div>
      </Article>
    </DefaultLayout>
  );
};

export default NotFound404Page;
