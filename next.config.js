/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  env: {
    NEXT_PUBLIC_APP_HOST: process.env.NEXT_PUBLIC_APP_HOST
  }
}

module.exports = nextConfig
