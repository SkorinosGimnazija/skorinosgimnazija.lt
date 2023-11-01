import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  onClick: VoidFunction;
  items: unknown[];
  left?: boolean;
}

export const CarouselButton: React.FC<Props> = ({ onClick, left, items }) => {
  const { t } = useTranslation();

  if (items.length <= 1) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`${left ? t.previous : t.next}`}
      className={`text-shadow absolute bottom-1/2 z-10 translate-y-1/2 text-6xl text-white ${
        left ? 'rotate-180' : 'right-0'
      }`}
    >
      <MdChevronRight />
    </button>
  );
};
