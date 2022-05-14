import React from 'react';
import { IPost } from '../../models/models';
import { PostCard } from './PostCard';

interface Props {
  posts: IPost[];
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="mb-4 space-y-4 lg:space-y-8">
      {posts?.map((x) => {
        return <PostCard key={x.id} post={x} />;
      })}
    </div>
  );
};
