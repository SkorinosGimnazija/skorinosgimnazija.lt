import Link from 'next/link';
import { env } from 'process';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';
import { toLocalDate, toLocalDateTime } from '../../utils/dateFormat';
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
    <article className="m-4 flex max-w-5xl overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-8">
        <h1 className="text-2xl">{post.title}</h1>
        <p className="text-sm text-gray-500">
          <span>{toLocalDate(post.publishedAt)}</span>
          {post.modifiedAt && (
            <span>
              {' '}
              ({t.modified} {toLocalDate(post.modifiedAt)})
            </span>
          )}
        </p>
        <div className="mt-6 text-justify text-lg">
          <Markdown>{post.text}</Markdown>
        </div>
        {post.images?.length && (
          <div className="pt-8">
            {post.images.map((src, id) => {
              return <img key={id} src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${src}`} alt="" />;
            })}
          </div>
        )}
      </div>
    </article>
  );
};
