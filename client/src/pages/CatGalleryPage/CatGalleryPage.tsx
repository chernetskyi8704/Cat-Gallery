import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IBreedData } from "@/types/CatData";
import useImagesQuery from "@/hooks/useImagesQuery";
import useBreedsQuery from "@/hooks/useBreedsQuery";

const CatGalleryPage = () => {
  const [breedsValue, setBreedValue] = useState<string>("All breeds");
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const navigate = useNavigate();

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: imagesError,
    isSuccess: isImagesSuccess,
  } = useImagesQuery(limit, breedsValue);

  const {
    data: breedsData,
    isLoading: breedsLoading,
    isError: breedsError,
    isSuccess: isBreedsSuccess,
  } = useBreedsQuery();

  useEffect(() => {
    if (breedsValue === "All breeds") {
      searchParams.delete("breed_ids");
    } else {
      searchParams.set("breed_ids", breedsValue);
    }
    setSearchParams(searchParams);
  }, [breedsValue, setSearchParams, searchParams]);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setBreedValue(selectedValue);

    navigate(
      `/gallery?limit=${limit}&breed_ids=${selectedValue !== "All breeds" ? selectedValue : ""}`,
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center items-center py-4">
        <form>
          <select
            name="breed"
            id="breed-select"
            value={breedsValue}
            onChange={handleOnChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All breeds">All breeds</option>
            {isBreedsSuccess &&
              breedsData?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </form>
      </div>

      <div className="flex-1 flex justify-center">
        <div
          className={`${
            isImagesLoading ? "flex" : ""
          } columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 outline-dashed`}
        >
          {isImagesLoading && (
            <p className="justify-self-center w-full text-center outline-dashed">
              Uploading images...
            </p>
          )}

          {imagesError && (
            <p className="text-center text-red-600">Image upload error!</p>
          )}

          {isImagesSuccess &&
            imagesData?.map(
              ({
                id,
                breeds,
                url,
              }: {
                id: string;
                breeds: IBreedData[];
                url: string;
              }) => {
                const { name } = breeds[0];

                return (
                  <div
                    className="break-inside-avoid mb-5 outline-dashed rounded-lg p-2"
                    key={id}
                  >
                    <p className="font-semibold">ID: {id}</p>
                    <p className="text-gray-600">Name: {name}</p>
                    <img
                      alt={name}
                      src={url}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                );
              },
            )}
        </div>
      </div>

      {breedsLoading && (
        <p className="text-center">Loading a list of breeds...</p>
      )}
      {breedsError && (
        <p className="text-center text-red-600">
          An error occurred while loading breeds!
        </p>
      )}
    </div>
  );
};

export default CatGalleryPage;
