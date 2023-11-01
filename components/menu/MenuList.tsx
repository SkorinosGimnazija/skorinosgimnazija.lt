import React from 'react';
import { IMenu } from '../../models/models';
import { MenuItem } from './MenuItem';

interface Props {
  menus: IMenu[];
}

export const MenuList: React.FC<Props> = ({ menus }) => {
  return (
    <nav className="overflow-hidden rounded-lg bg-white py-4 shadow-md">
      <ul>
        {menus
          ?.filter((x) => x.position === 'side')
          .map((x) => {
            return <MenuItem key={x.id} menu={x} />;
          })}
      </ul>
    </nav>
  );
};
