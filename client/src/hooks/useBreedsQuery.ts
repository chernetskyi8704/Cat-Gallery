import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchBreeds } from "@/api/cats-breeds";

const useBreedsQuery = () => {
  return useSuspenseQuery({
    queryFn: (meta) => fetchBreeds(meta),
    queryKey: ["cats-breeds"],
  });
};

export default useBreedsQuery;
