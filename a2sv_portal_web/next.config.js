/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
