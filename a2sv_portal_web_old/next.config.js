/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/auth/login',
        destination: '/auth',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
