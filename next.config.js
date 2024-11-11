const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['img.youtube.com', 'pratiqueemcasa.com.br', 'api.whatsapp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'node.clubecerto.com.br',
        port: '',
        pathname: '/superapp/**',
      },
    ],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
}

module.exports = nextConfig
