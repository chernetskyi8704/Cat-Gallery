import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  return useQuery({
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
    placeholderData: keepPreviousData,
  });
};

export default useImagesQuery;
