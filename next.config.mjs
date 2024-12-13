import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Disable TypeScript build-time error checking
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_IS_DEVELOPMENT: process.env.NODE_ENV === "development" ? "true" : "false",
  },
};
 
export default withNextIntl(nextConfig);