module.exports = {
  // swcMinify: true,
  compress: false,
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
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};
