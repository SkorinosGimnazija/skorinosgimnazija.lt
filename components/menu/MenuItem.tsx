import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { IMenu } from '../../models/models';

interface Props {
  menu: IMenu;
}

export const MenuItem: React.FC<Props> = ({ menu }) => {
  const { asPath } = useRouter();
  const isExpanded = useRef(asPath.startsWith(menu.path));
  const expandableRef = useRef<HTMLUListElement>();
  const chevronRef = useRef<HTMLSpanElement>();
  const isExpandable = menu.childMenus.length > 0;

  React.useEffect(() => {
    if (isExpanded.current) {
      // gsap.set(expandableRef.current, { height: 'auto', x: 20 });
      gsap.set(chevronRef.current, { rotateY: 180 });
    }
  }, []);

  const handleClick = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isExpandable) {
      return;
    }

    if (isExpanded.current) {
      gsap.to(expandableRef.current, { height: 0, x: 0 });
      gsap.to(chevronRef.current, { rotateY: 0 });
      isExpanded.current = false;
    } else {
      gsap.to(expandableRef.current, { height: 'auto', x: 20 });
      gsap.to(chevronRef.current, { rotateY: 180 });
      isExpanded.current = true;
    }

    e?.preventDefault();
  };

  const forceExpand = () => {
    if (isExpanded.current) {
      return;
    }

    handleClick();
  };

  return (
    <>
      <li className="text-lg transition-colors duration-200 hover:bg-gray-200">
        <Link href={isExpandable ? '#' : menu.url ?? menu.path}>
          <a
            className="flex justify-between px-6 py-2"
            onClick={handleClick}
            target={menu.url ? '_blank' : '_self'}
            rel={menu.url ? 'noreferrer noopener' : null}
          >
            {menu.title}
            {isExpandable && (
              <span ref={chevronRef} className="rotate-90 text-2xl">
                <MdChevronRight />
              </span>
            )}
          </a>
        </Link>
        {isExpandable && (
          <ul
            ref={expandableRef}
            className="h-0 overflow-hidden pl-5 pr-14"
            style={isExpanded.current ? { height: 'auto', transform: 'translate(20px)' } : null}
          >
            {menu.childMenus.map((submenu) => {
              return (
                <li key={submenu.id} className="hover:text-gray-500">
                  <Link href={submenu.url ?? submenu.path}>
                    <a
                      onFocus={forceExpand}
                      className="my-1 block"
                      target={submenu.url ? '_blank' : '_self'}
                      rel={submenu.url ? 'noreferrer noopener' : null}
                    >
                      {submenu.title}
                    </a>
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
