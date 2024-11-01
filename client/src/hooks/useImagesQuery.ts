import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "@/api/cats-images";

const useImagesQuery = (limit: string, breedsValue: string) => {
  return useQuery({
    queryFn: () =>
      fetchImages({
        limit: limit,
        breed_ids: breedsValue !== "All breeds" ? breedsValue : "",
      }),
    queryKey: ["cats-images", breedsValue, limit],
    staleTime: 300000,
  });
};

export default useImagesQuery;
