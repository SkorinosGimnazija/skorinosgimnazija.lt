import React from 'react';

interface Props {
  id:string;
}

export const Youtube: React.FC<Props> = ({ id }) => {
  return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        className="aspect-video w-full max-w-full mt-8 border-0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
  );
};