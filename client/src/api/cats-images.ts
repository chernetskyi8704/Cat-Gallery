// Для отримання всіх порід  https://api.thecatapi.com/v1/breeds

import { IImageData } from "@/types/CatData";

interface IQueryParams {
  limit?: string;
  breed_ids?: string;
}

const BASE_API = `https://api.thecatapi.com/v1`;
const API_KEY =
  "live_GtcA3gWllBIdVMuejOxETNcGkBVURSliPGOUHWhAuuKkyKGSVXiePfyqo8bjNTBd";

export async function fetchImages({
  limit = "10",
  breed_ids = "",
}: IQueryParams = {}): Promise<IImageData[]> {
  const query = new URLSearchParams({
    has_breeds: String(1),
    limit: String(limit),
    breed_ids: breed_ids,
  }).toString();

  const url = `${BASE_API}/images/search?${query}`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch cat images data`);
  }

  const data = res.json();

  return data;
}
