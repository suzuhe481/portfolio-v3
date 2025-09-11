import { S3Client } from "@aws-sdk/client-s3";

// Manually load .env.local from project root, not script root
// dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Creates an AWS S3 client, given the environment variables
 * AWS_S3_REGION, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_ACCESS_KEY, and
 * AWS_S3_BUCKET. If any of these variables are not set, it throws an error.
 *
 * Returns the S3 client.
 *
 * @throws If the AWS environment variables are not set.
 *
 * @returns The S3 client.
 */
export default async function createAwsS3Client() {
  if (
    !process.env.AWS_S3_REGION ||
    !process.env.AWS_S3_ACCESS_KEY ||
    !process.env.AWS_S3_SECRET_ACCESS_KEY ||
    !process.env.AWS_S3_BUCKET
  ) {
    console.error("AWS credentials not found");
    throw new Error("AWS environment variables are not set.");
  }

  try {
    // AWS S3 Client
    const s3 = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });

    return s3;
  } catch (err) {
    console.error("Cannot create AWS S3 client: ", err);
    throw new Error("Cannot create AWS S3 client.");
  }
}
