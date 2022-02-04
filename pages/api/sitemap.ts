import { NextApiRequest, NextApiResponse } from 'next';

const sitemap = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost</loc>
    <priority>1.00</priority>
  </url>
</urlset>`
  );

  res.end();
};

export default sitemap;
