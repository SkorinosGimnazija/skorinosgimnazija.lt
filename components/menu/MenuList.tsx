import React from 'react';
import { IMenu } from '../../models/models';
import { MenuItem } from './MenuItem';

interface Props {
  menus: IMenu[];
}

export const MenuList: React.FC<Props> = ({ menus }) => {
  return (
    <nav className="rounded-lg bg-white p-4 shadow-md">
      <ul>
        {menus?.map((x) => {
          return <MenuItem key={x.id} menu={x} />;
        })}
      </ul>
    </nav>
  );
};
