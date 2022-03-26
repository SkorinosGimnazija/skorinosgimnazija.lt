import React from 'react';
import { MdChevronLeft } from 'react-icons/md';

interface Props {
  onClick: VoidFunction;
}

export const CarouselPrevButton: React.FC<Props> = ({ onClick }) => {
  return (
    <span
      onClick={onClick}
      className="text-shadow absolute bottom-1/2 z-10 translate-y-1/2 cursor-pointer text-6xl text-white"
    >
      <MdChevronLeft />
    </span>
  );
};
