/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/chat',
        destination: 'http://localhost:3001/chat',
      },
    ]
  },
};

export default nextConfig;
