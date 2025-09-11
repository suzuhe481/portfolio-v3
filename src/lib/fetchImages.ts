"use client";

interface IAPIResponse<T> {
  data?: T;
  error?: boolean;
}

/**
 * Fetches the images for a given location from the server.
 *
 * @param location - The name of the travel location.
 * @param signal - An AbortSignal to abort the fetch request. If not provided, one will be created.
 *
 * @returns An IAPIResponse object with the data if the request was successful, or an error if not.
 *
 * @throws An error if the request was not successful.
 */
export default async function fetchImages<T>(
  location: string,
  signal?: AbortSignal
): Promise<IAPIResponse<T>> {
  const url = `/api/travel/images?location=${encodeURIComponent(location)}`;

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (response.ok) {
    return { data };
  } else {
    return { error: true };
  }
}
