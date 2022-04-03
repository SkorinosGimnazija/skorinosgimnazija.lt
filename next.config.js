module.exports = {
  // swcMinify: true,
  // compress: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_STATIC_URL],
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
