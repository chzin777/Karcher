import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  }
  // Redirecionamento removido para evitar loop
};

export default nextConfig;
