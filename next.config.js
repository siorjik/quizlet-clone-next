/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  }
}

module.exports = nextConfig
