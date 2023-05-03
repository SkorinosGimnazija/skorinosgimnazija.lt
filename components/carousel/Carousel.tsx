import gsap, { Expo } from 'gsap';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { CarouselButton } from './CarouselButton';
import { CarouselSwitcher } from './CarouselSwitcher';

interface Props {
  images?: string[];
}

export const Carousel: React.FC<Props> = ({ images }) => {
  const imageRefs = useRef<HTMLLIElement[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images?.length) {
    return null;
  }

  const handleClick = (offset: number) => () => {
    let nextImageIndex = currentImageIndex + offset;
    if (nextImageIndex < 0) nextImageIndex = images.length - 1;
    else if (nextImageIndex >= images.length) nextImageIndex = 0;

    const currentImage = imageRefs.current[currentImageIndex];
    const nextImage = imageRefs.current[nextImageIndex];

    animate(currentImage, nextImage, offset > 0);
    setCurrentImageIndex(nextImageIndex);
  };

  const animate = (current: HTMLLIElement, next: HTMLLIElement, forward: boolean) => {
    current.style.zIndex = '1';
    gsap.to(current, { opacity: 0, x: forward ? '-300px' : '300px', duration: 1 });
    gsap.fromTo(next, { scale: 1 }, { scale: 1.1, duration: 5 });
    gsap.fromTo(
      next,
      { opacity: 0, x: forward ? '300px' : '-300px', zIndex: '2' },
      { opacity: 1, x: '0px', duration: 1, ease: Expo.easeOut }
    );
  };

  const handleSliderClick = (id: number) => {
    const currentImage = imageRefs.current[currentImageIndex];
    const nextImage = imageRefs.current[id];

    animate(currentImage, nextImage, id > currentImageIndex);
    setCurrentImageIndex(id);
  };

  return (
    <section className="relative mt-8 w-full">
      <ul className="relative grid list-none overflow-hidden p-0">
        {images.map((src, id) => {
          return (
            <li
              key={id}
              ref={(ref) => (imageRefs.current[id] = ref)}
              className={`relative col-start-1 row-start-1 ${
                id === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ zIndex: id === 0 ? '2' : '1' }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${src}`}
                width={1600}
                height={900}
                quality={80}
                alt=""
              />
            </li>
          );
        })}
      </ul>
      <CarouselButton onClick={handleClick(-1)} items={images} left />
      <CarouselButton onClick={handleClick(1)} items={images} />
      <CarouselSwitcher
        items={images}
        currentIndex={currentImageIndex}
        onClick={handleSliderClick}
      />
    </section>
  );
};
