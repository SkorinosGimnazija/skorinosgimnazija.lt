import React from 'react';
import { IMenu } from '../../models/models';
import { MenuItem } from './MenuItem';

interface Props {
  menus: IMenu[];
}

export const MenuList: React.FC<Props> = ({ menus }) => {
  return (
    <nav className="overflow-hidden rounded-lg bg-white bg-opacity-80 py-4 shadow-md backdrop-blur-lg">
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
