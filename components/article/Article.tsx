import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Article: React.FC<Props> = ({ children, title }) => {
  return (
    <article className="overflow-hidden rounded-lg bg-white bg-opacity-70 shadow-md backdrop-blur-lg">
      <div className="w-full p-8">
        <h2 className="text-2xl">{title}</h2>
        {children}
      </div>
    </article>
  );
};
