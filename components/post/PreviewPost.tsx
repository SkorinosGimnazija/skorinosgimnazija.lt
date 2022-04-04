import Link from 'next/link';
import { env } from 'process';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';
import { toLocalDate, toLocalDateTime } from '../../utils/dateFormat';
import { Markdown } from '../markdown/Markdown';
import { PostDate } from './PostDate';
import { PostFeaturedImage } from './PostFeaturedImage';

interface Props {
  post: IPost;
}

export const PreviewPost: React.FC<Props> = ({ post }) => {
  const { t } = useTranslation();

  if (!post) {
    return null;
  }

  return (
    <Link href={`/news/${post.id}/${post.slug}`}>
      <a className="m-4 block" title={post.title}>
        <article className="flex overflow-hidden rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-lg">
          <PostFeaturedImage src={post.featuredImage} alt={post.title} />
          <div className="flex-1 p-6">
            <h1 className="text-2xl">{post.title}</h1>
            <PostDate published={post.publishedAt} modified={post.modifiedAt} />
            <div className="mt-4 text-lg">
              <Markdown>{post.introText}</Markdown>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};
