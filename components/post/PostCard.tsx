import Link from 'next/link';
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IPost } from '../../models/models';
import { Markdown } from '../markdown/Markdown';
import { PostDate } from './PostDate';
import { PostFeaturedImage } from './PostFeaturedImage';

interface Props {
  post: IPost;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <Link href={`/news/${post.id}/${post.slug}`}>
      <a className="block" title={post.title}>
        <article className="grid grid-cols-4 overflow-hidden rounded-lg bg-white bg-opacity-70 shadow-md backdrop-blur-lg">
          {post.featuredImage && (
            <div className="hidden overflow-hidden lg:block">
              <img
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                width={300}
                height={300}
                src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${post.featuredImage}`}
                alt={post.title}
              />
            </div>
          )}
          <div className={`p-6 ${post.featuredImage ? 'col-span-3' : 'col-span-full'}`}>
            <h2 className="text-2xl">{post.title}</h2>
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
