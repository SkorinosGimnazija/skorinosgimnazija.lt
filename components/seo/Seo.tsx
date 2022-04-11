import Head from 'next/head';
import React from 'react';
import Logo from '../../assets/images/logo-big.png';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';

interface Props {
  post?: IPost;
  title?: string;
}

const defaultDescripton =
  'Vilniaus Pranciškaus Skorinos gimnazija, Sietyno g. 21. Tel./faksas: +370 (5) 2459127, El. paštas: rastine@skorinos.vilnius.lm.lt';
const defaultImage = process.env.NEXT_PUBLIC_URL + Logo.src;

export const Seo: React.FC<Props> = ({ post, title }) => {
  const { t, locale } = useTranslation();

  title = title ?? post?.title;

  const pageTitle = (title ? title + ' – ' : '') + t.schoolNameShort;
  const pageDescription = post?.meta ?? defaultDescripton;
  const pageImage = post?.featuredImage
    ? process.env.NEXT_PUBLIC_STATIC_URL + '/' + post.featuredImage
    : defaultImage;

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta key="description" name="description" content={pageDescription} />

      <meta key="og_title" property="og:title" content={pageTitle} />
      <meta key="og_description" property="og:description" content={pageDescription} />
      <meta key="og_image" property="og:image" content={pageImage} />
      <meta key="og_type" property="og:type" content={post ? 'article' : 'website'} />
      <meta key="og_locale" property="og:locale" content={locale} />

      <meta key="tw_title" property="twitter:title" content={pageTitle} />
      <meta key="tw_description" property="twitter:description" content={pageDescription} />
      <meta key="tw_image" property="twitter:image" content={pageImage} />
      <meta key="tw_card" property="twitter:card" content="summary" />
    </Head>
  );
};
