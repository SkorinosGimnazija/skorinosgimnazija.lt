import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../api/api';
import config from '../../next.config';

const sitemap = async (_req: NextApiRequest, res: NextApiResponse) => {
  const [menus, posts, locales] = await Promise.all([
    api.getMenusMeta(),
    api.getPostsMeta(),
    api.getLocalesMeta(),
  ]);

  res.setHeader('Content-Type', 'application/xml');
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locales.map((x) => XmlUrl('', x.ln, x.date)).join('')}
      ${menus.map((x) => XmlUrl(x.url, x.ln, x.date)).join('')}
      ${posts.map((x) => XmlUrl('/news' + x.url, x.ln, x.date)).join('')}
    </urlset>`
  );

  res.end();
};

const XmlUrl = (url: string, language: string, date: string) => {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const defaultLocale = config.i18n.defaultLocale;
  const fullUrl = publicUrl + (language === defaultLocale ? '' : '/' + language) + url;

  return `<url><loc>${fullUrl}</loc><lastmod>${date}</lastmod></url>`;
};

export default sitemap;
