import { IImageData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";

interface IQueryParams {
  limit?: string;
  breed_ids?: string;
  page: string;
}

interface IImagesResponce {
  images: IImageData[];
  totalImagesCount: number;
  totalPagesCount: number;
}

async function fetchTotalImagesCount(breed_ids: string) {
  const query = new URLSearchParams({
    has_breeds: String(1),
    breed_ids: breed_ids,
    limit: "20",
  }).toString();

  const url = `${BASE_API_URL}/images/search?${query}`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch cat images data`);
  }

  const data = await res.json();

  const totalImagesCount = data.length;

  return totalImagesCount;
}

export async function fetchImages({
  limit = "10",
  breed_ids = "",
  page = "1",
}: IQueryParams): Promise<IImagesResponce> {
  const totalImagesCount = await fetchTotalImagesCount(breed_ids);
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const effectiveLimit = Math.min(totalImagesCount - offset, parseInt(limit));

  const query = new URLSearchParams({
    has_breeds: String(1),
    limit: String(effectiveLimit),
    breed_ids: breed_ids,
    page: String(page),
  }).toString();

  const url = `${BASE_API_URL}/images/search?${query}`;

  const imagesResponse = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!imagesResponse.ok) {
    throw new Error(`Failed to fetch cat images data`);
  }

  const data = await imagesResponse.json();

  const totalPagesCount = Math.ceil(totalImagesCount / parseInt(limit));

  return {
    images: data,
    totalImagesCount: totalImagesCount,
    totalPagesCount: totalPagesCount,
  };
}
