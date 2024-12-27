/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DEXIE_CLOUD_URL: process.env.DEXIE_CLOUD_URL,
  },
};

export default nextConfig;
