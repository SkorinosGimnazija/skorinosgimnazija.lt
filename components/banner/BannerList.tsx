import React from 'react';
import { IBanner } from '../../models/models';
import { BannerItem } from './BannerItem';

interface Props {
  banners: IBanner[];
}

export const BannerList: React.FC<Props> = ({ banners }) => {
  return (
    <div className="mt-8">
      {banners?.map((x) => {
        return <BannerItem key={x.id} banner={x} />;
      })}
    </div>
  );
};