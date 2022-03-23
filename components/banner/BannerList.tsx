import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { IBanner } from '../../models/models';

interface Props {
  banners: IBanner[];
}

export const BannerList: React.FC<Props> = ({ banners }) => {
  return (
    <div className="hidden pt-10 md:block">
      {banners?.map((x) => {
        return (
          <div key={x.id} className="my-4 overflow-hidden rounded-lg bg-white shadow-md">
            <Link href={x.url}>
              <a target="_blank" rel="noreferrer noopener" title={x.title}>
                <img
                  className="mx-auto p-2"
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
