import Link from 'next/link';
import { env } from 'process';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';
import { toLocalDate, toLocalDateTime } from '../../utils/dateFormat';
import { Markdown } from '../markdown/Markdown';
import styles from './PreviewPost.module.css';

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
      <a title={post.title}>
        <article
          className={`${styles.article} m-4 flex max-w-5xl overflow-hidden rounded-lg  bg-[rgba(255,255,255,0.8)] shadow-md backdrop-blur-sm`}
        >
          {post.featuredImage && (
            <div className="hidden min-w-[250px] overflow-hidden lg:block">
              <img
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                width={250}
                height={250}
                src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${post.featuredImage}`}
                alt={post.title}
              />
            </div>
          )}
          <div className="p-4">
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
            <div className="mt-4 text-lg">
              <Markdown>{post.introText}</Markdown>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};
