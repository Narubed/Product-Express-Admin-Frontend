/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["d-themes.com","localhost"],
  },
};

module.exports = nextConfig;