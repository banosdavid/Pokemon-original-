/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
    domains: ['raw.githubusercontent.com'], // Incluye también este dominio por compatibilidad
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;