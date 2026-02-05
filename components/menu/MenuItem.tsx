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
  const isExpandable = menu.children != null;
  const isExpanded = useRef(isExpandable && menu.children!.some(x => asPath == x.url));
  const expandableRef = useRef<HTMLUListElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (isExpandable && isExpanded.current) {
      // gsap.set(expandableRef.current, { height: 'auto', x: 20 });
      gsap.set(chevronRef.current, { rotateY: 180 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (isExpanded.current) {
      gsap.to(expandableRef.current, { height: 0, x: 0 });
      gsap.to(chevronRef.current, { rotateY: 0 });
      isExpanded.current = false;
    } else {
      gsap.to(expandableRef.current, { height: 'auto', x: 20 });
      gsap.to(chevronRef.current, { rotateY: 180 });
      isExpanded.current = true;
    }
  };

  const forceExpand = () => {
    if (isExpanded.current) {
      return;
    }

    handleClick();
  };

  const rootMenuLink = () => {
    if (isExpandable || !menu.url) {
      return (
        <button className="flex items-center justify-between px-6 py-2 w-full" onClick={handleClick}>
          {menu.title}
          <span ref={chevronRef} className="rotate-90 text-2xl">
            <MdChevronRight />
          </span>
        </button>
      );
    }

    return (
      <Link
        href={menu.url}
        className="flex items-center justify-between px-6 py-2"
        target={menu.isExternal ? '_blank' : '_self'}
        rel={menu.isExternal ? 'noreferrer noopener' : undefined}
      >
        {menu.title}
      </Link>
    );
  }

  return (
    <>
      <li className="text-lg transition-colors duration-200 hover:bg-gray-200">
        {rootMenuLink()}
        {isExpandable && (
          <ul
            ref={expandableRef}
            className="h-0 overflow-hidden pl-5 pr-14"
            style={isExpanded.current ? { height: 'auto', transform: 'translate(20px)' } : undefined}
          >
            {menu.children?.map((submenu) => {
              return (
                <li key={submenu.id} className="hover:text-gray-500">
                  <Link
                    href={submenu.url!}
                    onFocus={forceExpand}
                    className="my-1 block"
                    target={submenu.isExternal ? '_blank' : '_self'}
                    rel={submenu.isExternal ? 'noreferrer noopener' : undefined}
                  >
                    {submenu.title}
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