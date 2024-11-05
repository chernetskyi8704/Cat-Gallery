import { IImageData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";
import { queryOptions } from "@tanstack/react-query";

interface IFetchImagesParams {
  limit?: string;
  breed_ids?: string;
  page: string;
}

interface IImagesResponse {
  images: IImageData[];
  totalImagesCount: number;
  totalPagesCount: number;
}

export const catsImagesApi = {
  getImages: async (
    { limit = "10", breed_ids = "", page = "1" }: IFetchImagesParams,
    { signal }: { signal: AbortSignal },
  ): Promise<IImagesResponse> => {
    const query = new URLSearchParams({
      has_breeds: String(1),
      limit: String(limit),
      breed_ids: breed_ids,
      page: String(page),
    }).toString();

    const url = `${BASE_API_URL}/images/search?${query}`;

    const imagesResponse = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
      signal,
    });

    if (!imagesResponse.ok) {
      throw new Error(`Failed to fetch cat images data`);
    }

    const data = await imagesResponse.json();
    const totalImagesCount = parseInt(
      imagesResponse.headers.get("Pagination-Count") || "0",
    );
    const totalPagesCount = Math.ceil(totalImagesCount / +limit);

    return {
      images: data,
      totalImagesCount,
      totalPagesCount,
    };
  },
  getImagesQueryOptions: ({
    breedsValue,
    limit,
    page,
  }: {
    limit: string;
    breedsValue: string;
    page: string;
  }) => {
    return queryOptions({
      queryFn: (meta) =>
        catsImagesApi.getImages(
          {
            limit: limit,
            breed_ids: breedsValue,
            page,
          },
          meta,
        ),
      queryKey: ["cats-images", breedsValue, limit, page],
    });
  },
};
