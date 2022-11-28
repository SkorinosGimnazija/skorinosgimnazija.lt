import Link from 'next/link';
import React from 'react';
import { HiOutlineDocumentText, HiOutlineExternalLink } from 'react-icons/hi';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const PostLink: React.FC<Props> = ({ children, href }) => {
  const isLocal = href.startsWith('/') || href.startsWith(process.env.NEXT_PUBLIC_URL);
  const isDoc = href.endsWith('.pdf');
  const isExternal = !isDoc && !isLocal;

  return (
    <Link href={href}>
      <a
        className="text-blue-600 hover:text-blue-400 hover:underline"
        target={isLocal ? null : '_blank'}
        rel={isLocal ? null : 'noreferrer noopener'}
        onClick={(e) => e.stopPropagation()}
      >
        {isExternal && <HiOutlineExternalLink className="inline text-2xl" />}
        {isDoc && <HiOutlineDocumentText className="inline text-2xl" />}
        {children}
      </a>
    </Link>
  );
};
