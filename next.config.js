/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
