import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface Props {
  onClick: VoidFunction;
  items: any[];
  left?: boolean;
}

export const CarouselButton: React.FC<Props> = ({ onClick, left, items }) => {
  if (items.length <= 1) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`text-shadow absolute bottom-1/2 z-10 translate-y-1/2 text-6xl text-white ${
        left ? 'rotate-180' : 'right-0'
      }`}
    >
      <MdChevronRight />
    </button>
  );
};
