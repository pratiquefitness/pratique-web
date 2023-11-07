const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['img.youtube.com', 'pratiqueemcasa.com.br']
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
}

module.exports = nextConfig
