import createAwsS3Client from "./createAwsS3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Get a signed URL for an S3 object. This URL is valid for 120 seconds.
 *
 * @param key - The key of the S3 object.
 * @returns A signed URL for the S3 object.
 */
export async function getSignedImageUrl(key: string) {
  // Creating S3 client.
  const s3 = await createAwsS3Client();

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  const presignedUrl = await getSignedUrl(s3, command, {
    expiresIn: 120, // seconds
  });

  return presignedUrl;
}
