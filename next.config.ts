import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yepeawwcwsewmargwxnr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig