import React from 'react';
import { IPost } from '../../models/models';
import { Carousel } from '../carousel/Carousel';
import { Markdown } from '../markdown/Markdown';
import { Article } from '../article/Article';
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
    <Article title={post.title}>
      <PostDate published={post.publishedAt} modified={post.modifiedAt} hide={hideDate} />
      <div className="mt-6 text-lg">
        <Markdown>{post.text}</Markdown>
      </div>
      <Carousel images={post.images} />
    </Article>
  );
};
