import React from 'react';
import { IPost } from '../../models/models';
import { Carousel } from '../carousel/Carousel';
import { Markdown } from '../markdown/Markdown';
import { PostDate } from './PostDate';

interface Props {
  post: IPost;
  hideDate?: boolean;
}

export const Post: React.FC<Props> = ({ post, hideDate }) => {
  if (!post) {
    return null;
  }

  return (
    <article className="m-4 flex overflow-hidden rounded-lg bg-white bg-opacity-70 shadow-md backdrop-blur-lg">
      <div className="w-full p-8">
        <h1 className="text-2xl">{post.title}</h1>
        <PostDate published={post.publishedAt} modified={post.modifiedAt} hide={hideDate} />
        <div className="mt-6 text-lg">
          <Markdown>{post.text}</Markdown>
        </div>
        <Carousel images={post.images} />
      </div>
    </article>
  );
};
