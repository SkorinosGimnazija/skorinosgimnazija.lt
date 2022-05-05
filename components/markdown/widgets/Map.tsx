import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

export const Map: React.FC = () => {
  const { locale } = useTranslation();

  return (
    <iframe
      className="rounded-lg shadow-md"
      title="map"
      width="100%"
      height="400px"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?key=${
        process.env.NEXT_PUBLIC_MAP_KEY
      }&q=Vilniaus+Pranciškaus+Skorinos+gimnazija&zoom=13&language=${
        locale === 'lt' ? 'lt' : 'en'
      }`}
    />
  );
};
