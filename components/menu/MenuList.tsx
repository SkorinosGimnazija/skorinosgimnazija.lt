import React, { useEffect, useState, useRef } from 'react';
import { Menu } from '../../models/models';
import { MenuItem } from './MenuItem';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import gsap from 'gsap';

interface Props {
  menus: Menu[];
}

export const MenuList: React.FC<Props> = ({ menus }) => {
  return (
    <nav className="w-96">
      <ul>
        {menus.map((x) => {
          return <MenuItem key={x.id} menu={x} />;
        })}
      </ul>
    </nav>
  );
};
