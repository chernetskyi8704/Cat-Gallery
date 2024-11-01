import { IBreedData } from "@/types/CatData";

const BASE_API = `https://api.thecatapi.com/v1`;
const API_KEY =
  "live_GtcA3gWllBIdVMuejOxETNcGkBVURSliPGOUHWhAuuKkyKGSVXiePfyqo8bjNTBd";

export async function fetchBreeds(): Promise<IBreedData[]> {
  const url = `${BASE_API}/breeds`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch breeds data`);
  }

  const data = res.json();

  return data;
}
