import React from 'react';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';

interface Props {
  items: any[];
  currentIndex: number;
  onClick: (index: number) => void;
}

export const CarouselSwitcher: React.FC<Props> = ({ items, currentIndex, onClick }) => {
  if (items.length <= 1) {
    return null;
  }

  const handleClick = (id: number) => () => {
    onClick(id);
  };

  return (
    <div className="text-shadow absolute inset-x-0 bottom-0 z-10 mb-2 hidden flex-wrap justify-center gap-1 text-3xl text-white lg:flex">
      {items.map((_, id) => {
        return (
          <button key={id} onClick={handleClick(id)}>
            {id === currentIndex ? (
              <MdOutlineRadioButtonChecked />
            ) : (
              <MdOutlineRadioButtonUnchecked />
            )}
          </button>
        );
      })}
    </div>
  );
};
