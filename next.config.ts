import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: false,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.skorinosgimnazija.lt',
      },
    ],
    qualities: [75, 80, 90, 95, 100],
    contentDispositionType: 'inline',
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
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
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors \'self\';',
          },
        ],
      },
    ];
  },
};

export default nextConfig;