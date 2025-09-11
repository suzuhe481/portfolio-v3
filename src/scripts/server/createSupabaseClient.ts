import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client instance.
 *
 * Throws an error if the environment variables
 * `SUPABASE_PUBLIC_URL` and `SUPABASE_PUBLISHABLE_DEFAULT_KEY`
 * are not set.
 *
 * @throws {Error} If the environment variables are not set.
 *
 * @returns {SupabaseClient} A Supabase client instance.
 */
export default async function createSupabaseClient() {
  if (
    !process.env.SUPABASE_PUBLIC_URL ||
    !process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY
  ) {
    console.error("Supabase credentials not found");
    throw new Error("Supabase environment variables are not set.");
  }

  try {
    // Supabase Client
    const supabase = createClient(
      process.env.SUPABASE_PUBLIC_URL!,
      process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );

    return supabase;
  } catch (err) {
    console.error("Failed to create Supabase client:", err);

    throw new Error("Cannot create Supabaseclient.");
  }
}
