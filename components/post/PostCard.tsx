import Image from 'next/image';
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
      className="group grid cursor-pointer grid-cols-4 overflow-hidden rounded-lg bg-white shadow-md"
    >
      {post.featuredImage && (
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${post.featuredImage}`}
            alt={post.title}
            fill
            sizes="25vw"
            quality={90}
          />
        </div>
      )}
      <div className={`col-span-full p-6 ${post.featuredImage ? 'lg:col-span-3' : ''}`}>
        <Link href={`/news/${post.id}/${post.slug}`} onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl">{post.title}</h2>
        </Link>
        <PostDate published={post.publishedAt} modified={post.modifiedAt} />
        <div className="mt-4 text-lg">
          <Markdown>{post.introText}</Markdown>
        </div>
      </div>
    </article>
  );
};