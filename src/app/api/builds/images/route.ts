import { NextRequest } from "next/server";
import createSupabaseClient from "@/scripts/server/createSupabaseClient";
import { getSignedImageUrl } from "@/scripts/server/getSignedImageUrl";

// Shapre returned from supabase
interface IBuildImageRow {
  id: string;
  order_index: number;
  largeImage: { s3_url: string };
  thumbnailImage: { s3_url: string };
  description: { description: string };
}

// Final desired shape
interface IBuildImage {
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
async function transformData(data: IBuildImageRow[]): Promise<IBuildImage[]> {
  return Promise.all(
    data.map(async (row: IBuildImageRow) => {
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
 * API Route to fetch images for a given build.
 *
 * @param request - NextRequest object
 *
 * @returns An array of IBuildImage objects in the desired shape.
 *
 * @throws A Response object with a 400 status code if build is not provided
 * @throws A Response object with a 404 status code if build is not found or images are not found
 * @throws A Response object with a 500 status code if there is an error fetching images
 */
export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams;

  const buildName = searchParam.get("build");

  if (!buildName) {
    return new Response("No build provided", { status: 400 });
  }

  // Supabase client
  const supabase = await createSupabaseClient();

  // Get build id from database
  const { data: buildData } = await supabase
    .from("builds")
    .select(
      `
      id, 
      main_description
      `
    )
    .eq("name", buildName)
    .single();

  if (!buildData) {
    return new Response("Build not found", { status: 404 });
  }

  // Get images and data from database for the given build.
  const { data, error } = await supabase
    .from("build_images")
    .select(
      `
      id,
      order_index,
      largeImage:images!build_images_large_image_id_fkey(s3_url),
      thumbnailImage:images!build_images_thumbnail_image_id_fkey(s3_url),
      description:descriptions!build_images_description_id_fkey(description)
      `
    )
    .eq("build_id", buildData.id)
    .order("order_index", { ascending: true });

  // Resolve type errors by setting retrieved data to IBuildImageRow.
  const imagesData = data as unknown as IBuildImageRow[];

  // Transforming data to desired shape to send to client.
  const transformedData = await transformData(imagesData);

  // Adding the build's main description.
  const finalData = {
    main_description: buildData.main_description,
    imagesData: transformedData,
  };

  if (error) {
    return new Response("Error fetching images", { status: 500 });
  }

  if (!imagesData) {
    return new Response("Images not found", { status: 404 });
  }

  console.log(`Successfully fetched images from backend for: ${buildName}`);

  return new Response(JSON.stringify(finalData), {
    headers: { "Content-Type": "application/json" },
  });
}
