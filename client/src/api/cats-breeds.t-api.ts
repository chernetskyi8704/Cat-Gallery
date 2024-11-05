import { IBreedData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";
import { queryOptions } from "@tanstack/react-query";

export const breedsApi = {
  getBreeds: async ({
    signal,
  }: {
    signal: AbortSignal;
  }): Promise<IBreedData[]> => {
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
  },
  getBreedsQueryOptions: () => {
    return queryOptions({
      queryFn: (meta) => breedsApi.getBreeds(meta),
      queryKey: ["cats-breeds"],
    });
  },
};
