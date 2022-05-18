module.exports = {
  swcMinify: true,
  compress: false,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_STATIC_URL.replace(/^https?:\/\//, '').replace(/:\d+$/, '')],
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
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};
