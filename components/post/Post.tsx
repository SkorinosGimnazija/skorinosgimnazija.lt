import Link from 'next/link';
import { env } from 'process';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';
import { toLocalDate, toLocalDateTime } from '../../utils/dateFormat';
import { Carousel } from '../carousel/Carousel';
import { Markdown } from '../markdown/Markdown';

interface Props {
  post: IPost;
}

export const Post: React.FC<Props> = ({ post }) => {
  const { t } = useTranslation();

  if (!post) {
    return null;
  }

  return (
    <article className="m-4 flex max-w-5xl overflow-hidden rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-lg">
      <div className="p-8">
        <h1 className="text-2xl">{post.title}</h1>
        <p className="text-sm text-gray-500">
          <time dateTime={post.publishedAt}>{toLocalDate(post.publishedAt)}</time>
          {post.modifiedAt && (
            <>
              {' '}
              ({t.modified} {<time dateTime={post.modifiedAt}>{toLocalDate(post.modifiedAt)}</time>}
              )
            </>
          )}
        </p>
        <div className="mt-6 text-justify text-lg">
          <Markdown>{post.text}</Markdown>
        </div>
        <Carousel images={post.images} />
      </div>
    </article>
  );
};
