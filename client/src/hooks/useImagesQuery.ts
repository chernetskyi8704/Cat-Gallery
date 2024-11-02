import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "@/api/cats-images";

const useImagesQuery = (limit: string, breedsValue: string, page: string) => {
  return useQuery({
    queryFn: () =>
      fetchImages({
        limit: limit,
        breed_ids: breedsValue !== "All breeds" ? breedsValue : "",
        page,
      }),
    queryKey: ["cats-images", breedsValue, limit, page],
    staleTime: 3000000,
  });
};

export default useImagesQuery;
