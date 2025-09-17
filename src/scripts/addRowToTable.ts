import path from "path";
import dotenv from "dotenv";

import createSupabaseClient from "./server/createSupabaseClient";

// Manually load .env.local from project root, not script root
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Adds a single row to the given Supabase table.
 *
 * MEANT TO BE RUN IN TERMINAL, NOT IN PROJECT
 * Open terminal in project root and run...
 * npx ts-node --project tsconfig.scripts.json src/scripts/addRowToTable.ts
 *
 * @param {string} table_name The name of the table to add the row to.
 * @param {Record<string, unknown>} rowData An object with string keys and values of type unknown to add to the table.
 */
async function addRowToTable(
  table_name: string,
  rowData: Record<string, unknown>
) {
  try {
    const supabase = await createSupabaseClient();

    const { error } = await supabase.from(table_name).insert(rowData);

    if (error) throw error;

    console.log("Row added to Supabase table ", table_name);
  } catch (err) {
    console.log(
      "Couldn't add the row to Supabase table ",
      table_name,
      ": ",
      err
    );
  }
}

// Data to pass into the function
// const table_name = "travel_locations";
// const rowData = {
//   location: "Osaka",
//   country: "Japan",
//   latitude: 34.6937,
//   longitude: 135.5023,
// };

const table_name = "builds";
const rowData = {
  name: "PS5 DualSense Mod",
  main_description:
    "A modification to my PlayStation 5 DualSense controller where I change the faceplate, add rear buttons, and swap the joysticks to TMR joysticks.",
};

addRowToTable(table_name, rowData).catch((err) => console.error(err));
