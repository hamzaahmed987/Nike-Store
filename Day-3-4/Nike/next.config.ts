/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
       ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], 
  },
};

module.exports = nextConfig;
