/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost','t3.ftcdn.net'],
    },
    compiler: {
      styledComponents: true,
    },
};

export default nextConfig;
