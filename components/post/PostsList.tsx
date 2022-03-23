import React, { useEffect, useState, useRef } from 'react';
import { IPost } from '../../models/models';
import { PreviewPost } from './PreviewPost';

interface Props {
  posts: IPost[];
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts?.map((x) => {
        return <PreviewPost key={x.id} post={x} />;
      })}
    </div>
  );
};
