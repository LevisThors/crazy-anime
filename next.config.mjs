/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.bunnyccdn.co',
          },
        ],
      },
};

export default nextConfig;
