import { useSuspenseQuery } from "@tanstack/react-query";
import { breedsApi } from "@/api/cats-breeds.t-api";

const useBreedsQuery = () => {
  return useSuspenseQuery({
    ...breedsApi.getBreedsQueryOptions(),
  });
};

export default useBreedsQuery;
