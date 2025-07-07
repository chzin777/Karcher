import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://karcher-r3.com.br/",
        permanent: true, // Redirecionamento 301 para SEO correto
      },
    ];
  },
};

export default nextConfig;
