/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com", "ui-avatars.com", "backend.rehabco.online"], // Only hostnames without https://
  },
};

export default nextConfig;
