import React from 'react';
import MarkdownJsx from 'markdown-to-jsx';
import { PostLink } from './PostLink';

interface Props {
  children?: string | null;
}

export const Markdown: React.FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <MarkdownJsx
      options={{
        forceBlock: true,
        overrides: {
          a: PostLink,
        },
      }}
    >
      {children}
    </MarkdownJsx>
  );
};
