import { NextRequest } from "next/server";
import createSupabaseClient from "@/scripts/server/createSupabaseClient";
import { getSignedImageUrl } from "@/scripts/server/getSignedImageUrl";

// Shapre returned from supabase
interface ITravelImageRow {
  id: string;
  order_index: number;
  largeImage: { s3_url: string };
  thumbnailImage: { s3_url: string };
  description: { description: string };
}

// Final desired shape
interface ITravelImage {
  order_index: number;
  description: string;
  largeImage: string;
  thumbnailImage: string;
}

/**
 * Transform Supabase data into the desired shape.
 *
 * @param data - Data fetched from Supabase
 *
 * @returns An array of transformed data
 */
async function transformData(data: ITravelImageRow[]): Promise<ITravelImage[]> {
  return Promise.all(
    data.map(async (row: ITravelImageRow) => {
      const signedLargeUrl = await getSignedImageUrl(row.largeImage.s3_url);
      const signedThumbnailUrl = await getSignedImageUrl(
        row.thumbnailImage.s3_url
      );

      return {
        order_index: row.order_index,
        largeImage: signedLargeUrl,
        thumbnailImage: signedThumbnailUrl,
        description: row.description.description,
      };
    })
  );
}

/**
 * API Route to fetch images for a given location.
 *
 * @param request - NextRequest object
 *
 * @returns An array of ITravelImage objects in the desired shape.
 *
 * @throws A Response object with a 400 status code if location is not provided
 * @throws A Response object with a 404 status code if location is not found or images are not found
 * @throws A Response object with a 500 status code if there is an error fetching images
 */
export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams;

  const locationName = searchParam.get("location");

  if (!locationName) {
    return new Response("No location provided", { status: 400 });
  }

  // Supabase client
  const supabase = await createSupabaseClient();

  // Get location id from database
  const { data: locationData } = await supabase
    .from("travel_locations")
    .select("id")
    .eq("location", locationName)
    .single();

  if (!locationData) {
    return new Response("Location not found", { status: 404 });
  }

  // Get images and data from database for the given location.
  const { data, error } = await supabase
    .from("travel_images")
    .select(
      `
      id,
      order_index,
      largeImage:images!travel_images_large_image_id_fkey(s3_url),
      thumbnailImage:images!travel_images_thumbnail_image_id_fkey(s3_url),
      description:descriptions!travel_images_description_id_fkey(description)
      `
    )
    .eq("travel_location_id", locationData.id)
    .order("order_index", { ascending: true });

  // Resolve type errors by setting retrieved data to ITravelImageRow.
  const imagesData = data as unknown as ITravelImageRow[];

  // Transforming data to desired shape to send to client.
  const transformedData = await transformData(imagesData);

  if (error) {
    return new Response("Error fetching images", { status: 500 });
  }

  if (!imagesData) {
    return new Response("Images not found", { status: 404 });
  }

  console.log(`Successfully fetched images from backend for: ${locationName}`);

  return new Response(JSON.stringify(transformedData), {
    headers: { "Content-Type": "application/json" },
  });
}
