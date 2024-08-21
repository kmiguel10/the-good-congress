// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.congress.gov",
        port: "",
        pathname: "/img/member/**",
      },
    ],
  },
};

export default nextConfig;
