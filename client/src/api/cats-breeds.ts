import { IBreedData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";

export async function fetchBreeds({
  signal,
}: {
  signal: AbortSignal;
}): Promise<IBreedData[]> {
  const url = `${BASE_API_URL}/breeds`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch breeds data`);
  }

  const data = res.json();

  return data;
}
