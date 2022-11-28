import MarkdownJsx from 'markdown-to-jsx';
import React from 'react';
import { PostLink } from './PostLink';
import { PostTable } from './PostTable';
import { Contact } from './widgets/Contact';
import { Map } from './widgets/Map';
import { ParentsRegistration } from './widgets/ParentsRegistration';
import { Youtube } from './widgets/Youtube';

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
          table: PostTable,

          Contact: Contact,
          Map: Map,
          Youtube: Youtube,
          ParentsRegistration: ParentsRegistration,
        },
      }}
    >
      {children}
    </MarkdownJsx>
  );
};
