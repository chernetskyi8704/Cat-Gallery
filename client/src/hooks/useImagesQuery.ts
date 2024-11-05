import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { catsImagesApi } from "@/api/cats-images-api";

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
    ...catsImagesApi.getImagesQueryOptions({ limit, breedsValue, page }),
    placeholderData: keepPreviousData,
  });
};

export default useImagesQuery;
