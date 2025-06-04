import type { NextConfig } from "next";

// Use BACKEND_URL from env, fallback to local ddev
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.ddev.site';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      // Proxy all /proxy/* requests to backend /api/proxy/*
      {
        source: '/proxy/:path*',
        destination: `${BACKEND_URL}/api/proxy/:path*`,
      },
      // Auth (session/cookie) routes
      {
        source: '/auth/:path*',
        destination: `${BACKEND_URL}/auth/:path*`,
      },
      // Frontend (session/cookie) routes
      {
        source: '/products/:path*',
        destination: `${BACKEND_URL}/products/:path*`,
      },
      {
        source: '/categories/:path*',
        destination: `${BACKEND_URL}/categories/:path*`,
      },
      {
        source: '/ingredients/:path*',
        destination: `${BACKEND_URL}/ingredients/:path*`,
      },
      {
        source: '/recipes/:path*',
        destination: `${BACKEND_URL}/recipes/:path*`,
      },
      // Externe API (API key) routes
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;