/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Guarantees local public images load reliably in any environment
  },
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'bcryptjs'],
  },
};

export default nextConfig;
