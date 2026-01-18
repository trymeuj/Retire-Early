/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.retire-early.oddpages.site',
          },
        ],
        destination: 'https://retire-early.oddpages.site/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

