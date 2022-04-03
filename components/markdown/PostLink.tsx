import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface Props {
  href: string;
}

export const PostLink: React.FC<Props> = ({ children, href }) => {
  const isLocal = href.startsWith(process.env.NEXT_PUBLIC_URL);
  const isDoc = href.endsWith('.pdf');

  return (
    <Link href={href}>
      <a
        className="flex items-center text-blue-600 hover:text-blue-400 hover:underline"
        target={isLocal ? null : '_blank'}
        rel={isLocal ? null : 'noreferrer noopener'}
      >
        {isDoc && <HiOutlineDocumentText className="-ml-1 text-2xl" />}
        {children}
      </a>
    </Link>
  );
};
