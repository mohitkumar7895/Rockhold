/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false, // Prevents build-time Google Fonts fetch crashes in CI/Vercel/containers
  images: {
    unoptimized: true, // Guarantees local public images load reliably in any environment
  },
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'bcryptjs'],
  },
};

export default nextConfig;
