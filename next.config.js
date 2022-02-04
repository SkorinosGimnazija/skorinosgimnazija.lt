module.exports = {
  swcMinify: true,
  compress: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['static.skorinosgimnazija.lt', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['lt', 'by', 'en'],
    defaultLocale: 'lt',
    localeDetection: false,
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/lt/sitemap.xml',
          destination: '/api/sitemap',
          locale: false,
        },
      ],
    };
  },
};
