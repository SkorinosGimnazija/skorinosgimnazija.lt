import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface Props {}

export const FooterWave: React.FC<Props> = () => {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        backgroundPositionX: `0px`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'footer',
          scrub: 5,
        },
      },
      {
        backgroundPositionX: `-400px`,
        ease: 'none',
        scrollTrigger: {
          trigger: 'footer',
          scrub: 5,
        },
      }
    );
  }, []);

  return <div ref={ref} className="wave bg-transparent" id="wave"></div>;
};
