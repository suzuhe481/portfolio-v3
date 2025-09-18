import fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

import createAwsS3Client from "./server/createAwsS3Client";
import createSupabaseClient from "./server/createSupabaseClient";

// Manually load .env.local from project root, not script root
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Uploads a file to AWS S3.
 *
 * @param filePath - The path to the file to upload.
 * @param key - The key to use for the uploaded file.
 *
 * @returns An object with the uploaded file's key.
 */
async function uploadFileToS3(filePath: string, key: string) {
  // Creating S3 client.
  const s3 = await createAwsS3Client();

  const fileStream = fs.createReadStream(filePath);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileStream,
    ContentType: "image/jpeg",
  });

  await s3.send(command);

  const result = key;

  return result;
}

/**
 * Retrieves the id of a travel location in the database given its name from the travel_locations table.
 *
 * @param {string} locationName The name of the travel location.
 * @returns {Promise<number | undefined>} The id of the travel location, or undefined if the operation fails.
 */
async function getTravelLocationId(locationName: string) {
  try {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("travel_locations")
      .select("id")
      .eq("location", locationName)
      .single();

    if (error) throw error;

    console.log("Successfully fetched travel location id for", locationName);

    const id = data.id;

    return id;
  } catch (err) {
    console.log(
      "Failed to fetch travel location id for ",
      locationName,
      ": ",
      err
    );
  }
}

/**
 * Retrieves a sorted list of image files in a given folder.
 *
 * @param {string} folderPath The path to the folder.
 * @returns {Promise<string[]>} A list of image file names in the folder, sorted by the trailing number in the file name.
 */
async function getFolderImages(folderPath: string) {
  // const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".jpg"));
  // Sorts the files by the trailing number in file name.
  // Prevents sorting lexicographically by filename.
  // i.e. 1.jpg comes before 10.jpg.
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".jpg"))
    .sort((a, b) => {
      // Sorts by the last number before ".jpg".
      const numA = parseInt(a.match(/(\d+)(?=\.jpg$)/)?.[0] ?? "0", 10);
      const numB = parseInt(b.match(/(\d+)(?=\.jpg$)/)?.[0] ?? "0", 10);
      return numA - numB;
    });

  return files;
}

/**
 * Process a 2 folders of files and an array of descriptions.
 * For each file...
 * 1) Upload the large and thumbnail image to AWS S3.
 * 2) Store the data for both images in the images table.
 * 3) Store the description for the iamge in the descriptions table.
 * 3) Store the returned data in the travel_images table.
 *
 * @param locationName - The name of the travel location.
 * @param largePath - The path to the folder containing the large images.
 * @param thumbnailPath - The path to the folder containing the thumbnail images.
 * @param descriptions - An array of descriptions for each image.
 *
 * @returns A Promise that resolves when all images have been processed.
 *
 * @throws An error if the number of descriptions does not match the number of images.
 * @throws An error if the location ID is not found.
 * @throws An error if there is a problem inserting into either the images or travel_images tables.
 */
async function uploadImages(
  locationName: string,
  largePath: string,
  thumbnailPath: string,
  descriptions: string[]
) {
  // Creating Supabase client.
  const supabase = await createSupabaseClient();

  const largeImages = await getFolderImages(largePath);
  const thumbnailImages = await getFolderImages(thumbnailPath);

  if (largeImages.length !== thumbnailImages.length) {
    throw new Error(
      "Number of large images must equal the number of thumbnail images"
    );
  }

  if (largeImages.length !== descriptions.length) {
    throw new Error("Number of descriptions must equal the number of images");
  }

  const travelLocationId = await getTravelLocationId(locationName);
  if (!travelLocationId) {
    throw new Error("Location ID not found");
  }

  for (let i = 0; i < largeImages.length; i++) {
    const largeImage = largeImages[i];
    const largeFilePath = path.join(largePath, largeImage);

    const thumbnailImage = thumbnailImages[i];
    const thumbnailFilePath = path.join(thumbnailPath, thumbnailImage);
    const description = descriptions[i];

    // Upload large and thumbnail images to S3 bucket
    const large_key = `${locationName}/large/${largeImage}`;
    const large_s3Url = await uploadFileToS3(largeFilePath, large_key);

    const thumbnail_key = `${locationName}/thumbnail/${thumbnailImage}`;
    const thumbnail_s3Url = await uploadFileToS3(
      thumbnailFilePath,
      thumbnail_key
    );

    // Insert large image data into database. images table. Return newly inserted row.
    const { data: largeImageData, error: largeImgErr } = await supabase
      .from("images")
      .insert({ s3_url: large_s3Url })
      .select()
      .single();

    if (largeImgErr) throw largeImgErr;

    // Insert thumbnail image data into database. images table. Return newly inserted row.
    const { data: thumbnailImageData, error: thumbnailImgErr } = await supabase
      .from("images")
      .insert({ s3_url: thumbnail_s3Url })
      .select()
      .single();

    if (thumbnailImgErr) throw thumbnailImgErr;

    // Insert description data into database. descriptions table. Return newly inserted row.
    const { data: descriptionsData, error: descriptionErr } = await supabase
      .from("descriptions")
      .insert({ description: description })
      .select()
      .single();

    if (descriptionErr) throw descriptionErr;

    // Extracting database IDs from large, thumbnail, and description rows.
    const largeImageID = largeImageData.id;
    const thumbnailImageID = thumbnailImageData.id;
    const descriptionID = descriptionsData.id;

    // Insert into database. travel_images table
    const { error: travelImagesErr } = await supabase
      .from("travel_images")
      .insert({
        travel_location_id: travelLocationId,
        large_image_id: largeImageID,
        thumbnail_image_id: thumbnailImageID,
        order_index: i + 1,
        description_id: descriptionID,
      });

    if (travelImagesErr) throw travelImagesErr;

    console.log(
      `(${i + 1}/${
        largeImages.length
      }): Uploaded large and thumbnail image to S3 and added new Supabase entries.`
    );
  }
}

/**
 * Uploads images for a given location to an AWS S3 bucket and updates the database.
 * Uploads both the large and thumbnail images for the given location.
 * Used to easily upload pictures and descriptions.
 * Location provided must already exist in the location table in the database.
 * The descriptions array must be the same length as the number of images. Use empty strings for no description.
 *
 * Before uploading pictures...
 * 1) Create a descriptions array.
 * 2) Add a location which matches an an existing location name in the database.
 *
 * MEANT TO BE RUN IN TERMINAL, NOT IN PROJECT
 * Open terminal in project root and run...
 * npx ts-node --project tsconfig.scripts.json src/scripts/uploadImages.ts
 */
async function main() {
  // Array of descriptions for each image.
  // Must equal the number of images.
  // Use empty string for no description.
  const descriptions = [
    "Taking a day trip to Sperlonga from Rome.",
    "View form a boat.",
    "View of the beach.",
    "Pizza lunch.",
    "Climbing up narrow stairs in a very cramped neighborhood.",
    "View of the beaches while climbing.",
    "A large courtyard when I reached the top.",
    "I'm pointing at the beach where I started.",
    "Climbing back down to head back to Rome. I have a funny story of almost not being able to go back to Rome because there were no buses going to the train station.",
  ];

  // Location variable to edit. Should be a location listed in the travel_locations table.
  const location = "Sperlonga";

  const largeImagePath = `./upload_images/${location}/Large`;
  const thumbnailImagePath = `./upload_images/${location}/Thumbnail`;

  if (!fs.existsSync(thumbnailImagePath)) {
    throw new Error("Large image path does not exist.");
  }

  if (!fs.existsSync(thumbnailImagePath)) {
    throw new Error("Thumbnail image path does not exist.");
  }

  await uploadImages(
    location,
    largeImagePath,
    thumbnailImagePath,
    descriptions
  );

  console.log("All Uploads Complete!");
}

main().catch((err) => console.error(err));
