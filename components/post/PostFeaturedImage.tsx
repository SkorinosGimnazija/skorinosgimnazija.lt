import React, { useEffect, useState, useRef } from 'react';

interface Props {
  src?: string;
  alt: string;
}

export const PostFeaturedImage: React.FC<Props> = ({ src, alt }) => {
  if (!src) {
    return null;
  }

  return (
    <div className="hidden basis-1/3 overflow-hidden lg:block xl:basis-1/4">
      <img
        className="h-full w-full object-cover transition-transform duration-500 ease-out"
        width={300}
        height={300}
        src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${src}`}
        alt={alt}
      />
    </div>
  );
};
