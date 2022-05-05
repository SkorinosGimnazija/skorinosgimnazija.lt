import Link from 'next/link';
import React from 'react';
import { IBanner } from '../../models/models';

interface Props {
  banners?: IBanner[];
}

export const BannerList: React.FC<Props> = ({ banners }) => {
  if (!banners?.length) {
    return null;
  }

  return (
    <div className="mt-8">
      {banners?.map((x) => {
        return (
          <div
            key={x.id}
            className="my-4 hidden overflow-hidden rounded-lg bg-white bg-opacity-70 px-2 py-4 shadow-md backdrop-blur-lg lg:block"
          >
            <Link href={x.url}>
              <a target="_blank" rel="noreferrer noopener" title={x.title}>
                <img
                  className="mx-auto transition-transform duration-300 hover:scale-105"
                  src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${x.pictureUrl}`}
                  width={x.width}
                  height={x.height}
                  alt={x.title}
                />
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
