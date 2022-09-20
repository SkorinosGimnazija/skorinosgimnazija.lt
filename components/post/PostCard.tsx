import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IPost } from '../../models/models';
import { Markdown } from '../markdown/Markdown';
import { PostDate } from './PostDate';

interface Props {
  post: IPost;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const router = useRouter();

  if (!post) {
    return null;
  }

  return (
    <article
      title={post.title}
      onClick={() => router.push(`/news/${post.id}/${post.slug}`)}
      className="grid cursor-pointer grid-cols-4 overflow-hidden rounded-lg bg-white bg-opacity-70 shadow-md backdrop-blur-lg"
    >
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
      <div className={`col-span-full p-6 ${post.featuredImage ? 'lg:col-span-3' : ''}`}>
        <Link href={`/news/${post.id}/${post.slug}`}>
          <a onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl">{post.title}</h2>
          </a>
        </Link>
        <PostDate published={post.publishedAt} modified={post.modifiedAt} />
        <div className="mt-4 text-lg">
          <Markdown>{post.introText}</Markdown>
        </div>
      </div>
    </article>
  );
};
