/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['images.microcms-assets.io', 'placehold.jp'],
  },
  experimental: {
    optimizeFonts: true,
  },
}

module.exports = nextConfig
