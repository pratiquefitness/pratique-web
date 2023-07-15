const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['img.youtube.com', 'pratiqueemcasa.com.br']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
}

module.exports = nextConfig
