import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface Props {
  onClick: VoidFunction;
}

export const CarouselNextButton: React.FC<Props> = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className="text-shadow absolute right-0 bottom-1/2 z-10 translate-y-1/2 cursor-pointer text-6xl text-white"
    >
      <MdChevronRight />
    </span>
  );
};
