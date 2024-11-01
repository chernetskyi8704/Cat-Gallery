import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "@/api/cats-breeds";

const useBreedsQuery = () => {
  return useQuery({
    queryFn: () => fetchBreeds(),
    queryKey: ["cats-breeds"],
    staleTime: 300000,
  });
};

export default useBreedsQuery;
