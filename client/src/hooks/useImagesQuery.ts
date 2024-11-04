import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchImages } from "@/api/cats-images";

const useImagesQuery = ({
  limit,
  breedsValue,
  page,
}: {
  limit: string;
  breedsValue: string;
  page: string;
}) => {
  return useSuspenseQuery({
    queryFn: () =>
      fetchImages({
        limit: limit,
        breed_ids: breedsValue,
        page,
      }),
    queryKey: ["cats-images", breedsValue, limit, page],
    staleTime: 3000000,
  });
};

export default useImagesQuery;
