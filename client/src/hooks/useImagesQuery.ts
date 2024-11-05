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
    queryFn: (meta) =>
      fetchImages(
        {
          limit: limit,
          breed_ids: breedsValue,
          page,
        },
        meta,
      ),
    queryKey: ["cats-images", breedsValue, limit, page],
  });
};

export default useImagesQuery;
