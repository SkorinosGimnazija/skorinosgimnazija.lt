import React, { useEffect, useState, useRef } from 'react';

interface Props {
  data: any;
}

export const Post: React.FC<Props> = ({ data }) => {
  return (
    <article className="m-4">
      {data.title} {data.language.name}
      <br />
      {data.introText}
    </article>
  );
};
