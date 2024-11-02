import { IImageData } from "@/types/CatData";
import { API_KEY, BASE_API_URL } from "@/utils/constants";

interface IQueryParams {
  limit?: string;
  breed_ids?: string;
}

interface IImagesResponce {
  images: IImageData[];
  totalImagesCount: number;
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
}: IQueryParams): Promise<IImagesResponce> {
  const query = new URLSearchParams({
    has_breeds: String(1),
    limit: String(limit),
    breed_ids: breed_ids,
  }).toString();

  const url = `${BASE_API_URL}/images/search?${query}`;

  const [imagesResponse, totalImagesCount] = await Promise.all([
    fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    }),
    fetchTotalImagesCount(breed_ids),
  ]);

  console.log(imagesResponse);

  if (!imagesResponse.ok) {
    throw new Error(`Failed to fetch cat images data`);
  }

  const data = await imagesResponse.json();

  return {
    images: data,
    totalImagesCount: totalImagesCount,
  };
}
