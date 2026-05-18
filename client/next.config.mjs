/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/chat',
        destination: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/chat` : 'http://localhost:3001/chat',
      },
    ]
  },
};

export default nextConfig;
