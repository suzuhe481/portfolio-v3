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
};

export default nextConfig;
