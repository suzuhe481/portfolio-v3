import type { NextConfig } from "next";

import dotenv from "dotenv";
import path from "path";

// Manually load .env.local
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    process.env.DEV_ALLOWED_ORIGIN || "http://localhost:3000",
  ],
};

export default nextConfig;
