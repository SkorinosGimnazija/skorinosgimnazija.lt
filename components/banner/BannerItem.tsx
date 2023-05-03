import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IBanner } from '../../models/models';

interface Props {
  banner: IBanner;
}

export const BannerItem: React.FC<Props> = ({ banner }) => {
  const isLocal = banner.url.startsWith('/');

  return (
    <div className="my-4 hidden overflow-hidden rounded-lg bg-white bg-opacity-70 px-2 py-4 shadow-md backdrop-blur-lg lg:flex lg:justify-center">
      <Link
        href={banner.url}
        target={isLocal ? null : '_blank'}
        rel={isLocal ? null : 'noreferrer noopener'}
        title={banner.title}
      >
        <Image
          className="transition-transform duration-300 hover:scale-105"
          src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${banner.pictureUrl}`}
          width={banner.width}
          height={banner.height}
          alt={banner.title}
        />
      </Link>
    </div>
  );
};
