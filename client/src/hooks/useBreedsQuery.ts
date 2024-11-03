import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchBreeds } from "@/api/cats-breeds";

const useBreedsQuery = () => {
  return useSuspenseQuery({
    queryFn: () => fetchBreeds(),
    queryKey: ["cats-breeds"],
    staleTime: 300000,
  });
};

export default useBreedsQuery;
