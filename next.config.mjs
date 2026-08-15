/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: output: 'export' can be toggled if pure static HTML export is desired,
  // or omitted for hybrid/Vercel standard App Router edge optimization.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
