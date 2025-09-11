/**
 * This file tests the connection between AWS and Supabase by creating clients for both
 * and checking the connection to them.
 *
 * MEANT TO BE RUN IN TERMINAL, NOT IN PROJECT.
 * The --project flag tells ts-node to use a different tsconfig file.
 * A separate tsconfig(tsconfig.scripts.json) is required for this script.
 *
 * Open terminal in project root and run...
 * npx ts-node --project tsconfig.scripts.json src/scripts/runConnectionTests.ts
 */

import path from "path";
import { HeadBucketCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

import createAwsS3Client from "./server/createAwsS3Client";
import createSupabaseClient from "./server/createSupabaseClient";

// Manually load .env.local from project root, not script root
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testS3BucketConnection() {
  const s3 = await createAwsS3Client();

  try {
    await s3.send(new HeadBucketCommand({ Bucket: process.env.AWS_S3_BUCKET }));
    console.log("Can access bucket:", process.env.AWS_S3_BUCKET);
  } catch (err) {
    console.error("Cannot access bucket:", err);
  }
}

async function testSupabaseConnection() {
  const supabase = await createSupabaseClient();

  try {
    // Run a very lightweight query
    const { data, error } = await supabase.from("images").select("id").limit(1);

    if (error) throw error;
    console.log("Connected to Supabase. Table data:", data?.[0]?.id);
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
  }
}

async function runConnectionTests() {
  await testS3BucketConnection();
  await testSupabaseConnection();
}

runConnectionTests().catch((err) => console.error(err));
