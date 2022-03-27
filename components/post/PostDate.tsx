import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { toLocalDate } from '../../utils/dateFormat';

interface Props {
  published: string;
  modified?: string;
  hide?: boolean;
}

export const PostDate: React.FC<Props> = ({ published, modified, hide }) => {
  const { t } = useTranslation();

  if (hide) {
    return null;
  }

  return (
    <p className="text-sm text-gray-500">
      <time dateTime={published}>{toLocalDate(published)}</time>
      {modified && (
        <>
          {' '}
          ({t.modified} {<time dateTime={modified}>{toLocalDate(modified)}</time>})
        </>
      )}
    </p>
  );
};
