import createSupabaseClient from "./server/createSupabaseClient";

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
const table_name = "travel_locations";
const rowData = {
  location: "Osaka",
  country: "Japan",
  latitude: 34.6937,
  longitude: 135.5023,
};

addRowToTable(table_name, rowData).catch((err) => console.error(err));
