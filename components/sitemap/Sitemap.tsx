import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { IMenu } from '../../models/models';
import { Article } from '../article/Article';
import { PostLink } from '../markdown/PostLink';

interface Props {
  menus: IMenu[];
}

export const Sitemap: React.FC<Props> = ({ menus }) => {
  const { t } = useTranslation();

  return (
    <Article title={t.sitemap}>
      <ul className="mt-4 list-none">
        {menus.map((rootMenu) => {
          return (
            <li key={rootMenu.id}>
              {rootMenu.childMenus?.length > 0 ? (
                <>
                  {rootMenu.title}
                  <ul className="list-none">
                    {rootMenu.childMenus.map((childMenu) => {
                      return (
                        <li key={childMenu.id}>
                          <PostLink href={childMenu.url ?? childMenu.path}>
                            {childMenu.title}
                          </PostLink>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <PostLink href={rootMenu.url ?? rootMenu.path}>{rootMenu.title}</PostLink>
              )}
            </li>
          );
        })}
      </ul>
    </Article>
  );
};
