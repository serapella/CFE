import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://laravel.ddev.site/api/:path*'
      },
      {
        source: '/products/:path*',
        destination: 'http://laravel.ddev.site/products/:path*'
      },
      {
        source: '/categories/:path*',
        destination: 'http://laravel.ddev.site/categories/:path*'
      },
      {
        source: '/ingredients/:path*',
        destination: 'http://laravel.ddev.site/ingredients/:path*'
      },
      {
        source: '/recipes/:path*',
        destination: 'http://laravel.ddev.site/recipes/:path*'
      }
    ]
  }
};

export default nextConfig;
