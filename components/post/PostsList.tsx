import React, { useEffect, useState, useRef } from 'react';
import { IPost } from '../../models/models';
import { PreviewPost } from './PreviewPost';

interface Props {
  posts: IPost[];
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="mb-4 space-y-4 lg:space-y-8">
      {posts?.map((x) => {
        return <PreviewPost key={x.id} post={x} />;
      })}
    </div>
  );
};
