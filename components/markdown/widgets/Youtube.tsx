import React from 'react';

interface Props {
  children: [string];
}

export const Youtube: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full justify-center">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${children[0]}`}
        className="aspect-video w-full max-w-full pt-6"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
