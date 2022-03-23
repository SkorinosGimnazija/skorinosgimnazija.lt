import React from 'react';
import MarkdownJsx from 'markdown-to-jsx';

interface Props {
  children?: string | null;
}

export const Markdown: React.FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <MarkdownJsx
      options={
        {
          // overrides: {
          //   img: {
          //     component: MyImage,
          //     props: {
          //       // props: 'foo',
          //     },
          //   },
          // },
        }
      }
    >
      {children}
    </MarkdownJsx>
  );
};
