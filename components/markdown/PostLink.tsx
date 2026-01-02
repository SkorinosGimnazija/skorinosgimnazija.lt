import Link from 'next/link';
import React from 'react';
import { HiOutlineDocumentText, HiOutlineExternalLink } from 'react-icons/hi';

interface Props {
  href: string;
  children: React.ReactNode;
}

export const PostLink: React.FC<Props> = ({ children, href }) => {
  const isLocal = href.startsWith('/') || href.startsWith(process.env.NEXT_PUBLIC_URL);
  const isDoc = href.startsWith(process.env.NEXT_PUBLIC_STATIC_URL);
  const isExternal = !isDoc && !isLocal;

  return (
    <Link
      href={href}
      className="text-blue-600 hover:text-blue-400 hover:underline text-nowrap"
      target={isLocal ? undefined : '_blank'}
      rel={isLocal ? undefined : 'noopener noreferrer nofollow'}
      onClick={(e) => e.stopPropagation()}
    >
      {isDoc && <HiOutlineDocumentText className="inline-flex text-2xl" />}
      <span className="text-wrap">{children}</span>
      {isExternal && <HiOutlineExternalLink className="inline-flex text-2xl" />}
    </Link>
  );
};