import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../api/api';
import config from '../../next.config';

const sitemap = async (_req: NextApiRequest, res: NextApiResponse) => {
  const [menus, posts] = await Promise.all([api.getMenusMeta(), api.getPostsMeta()]);

  res.setHeader('Content-Type', 'application/xml');

  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${menus
        .map((x) => {
          return `<url>
            <loc>${
              process.env.NEXT_PUBLIC_URL +
              (x.language === config.i18n.defaultLocale ? '' : '/' + x.language) +
              x.url
            }</loc>
            <priority>1.0</priority>
            <changefreq>weekly</changefreq>
          </url>`;
        })
        .join('')}
      ${posts
        .map((x) => {
          return `<url>
            <loc>${
              process.env.NEXT_PUBLIC_URL +
              (x.language === config.i18n.defaultLocale ? '' : '/' + x.language) +
              '/news' +
              x.url
            }</loc>
            <priority>0.5</priority>
            <changefreq>monthly</changefreq>
          </url>`;
        })
        .join('')}
    </urlset>`
  );

  res.end();
};

export default sitemap;
