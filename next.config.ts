import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: false,
  reactStrictMode: true,
  poweredByHeader: false,
  reactCompiler: true,
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
    qualities: [75, 80, 85, 90, 95, 100],
    contentDispositionType: 'inline',
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)