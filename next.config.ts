import type { NextConfig } from "next";

import dotenv from "dotenv";
import path from "path";

// Manually load .env.local
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const isProd = process.env.NODE_ENV! === "production";

const nextConfig: NextConfig = {
  ...(isProd && {
    allowedDevOrigins: [process.env.PRODUCTION_URL!],
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
