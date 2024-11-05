import { IImageData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";

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

export async function fetchImages(
  { limit = "10", breed_ids = "", page = "1" }: IFetchImagesParams,
  { signal }: { signal: AbortSignal },
): Promise<IImagesResponse> {
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
  const paginationLimit = parseInt(
    imagesResponse.headers.get("Pagination-Limit") || limit,
  );
  const totalPagesCount = Math.ceil(totalImagesCount / paginationLimit);

  return {
    images: data,
    totalImagesCount,
    totalPagesCount,
  };
}
