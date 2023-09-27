/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }
    ]
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
