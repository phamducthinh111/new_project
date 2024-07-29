/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost'],
    },
    compiler: {
      styledComponents: true,
    },
};

export default nextConfig;
