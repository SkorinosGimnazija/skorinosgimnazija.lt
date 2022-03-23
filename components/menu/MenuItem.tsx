import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { IMenu } from '../../models/models';
import gsap from 'gsap';

interface Props {
  level?: number;
  menu: IMenu;
}

export const MenuItem: React.FC<Props> = ({ menu, level }) => {
  const isExpandable = menu.childMenus.length > 0;
  const isExpanded = useRef(false);
  const expandableRef = useRef<HTMLUListElement>();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isExpandable) {
      return;
    }

    gsap.to(
      expandableRef.current,
      isExpanded.current ? { height: 0, x: 0 } : { height: 'auto', x: 10 }
    );
    isExpanded.current = !isExpanded.current;
    e.preventDefault();
  };

  return (
    <>
      <li>
        <Link href={isExpandable ? '#' : menu.url ?? menu.path}>
          <a onClick={handleClick} target={menu.url ? '_blank' : '_self'}>
            {menu.title}
          </a>
        </Link>
        {isExpandable && (
          <ul ref={expandableRef} className="h-0 overflow-hidden">
            {menu.childMenus.map((submenu) => {
              return (
                <li key={submenu.id}>
                  <Link href={submenu.url ?? submenu.path}>
                    <a target={submenu.url ? '_blank' : '_self'}>{submenu.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
};
