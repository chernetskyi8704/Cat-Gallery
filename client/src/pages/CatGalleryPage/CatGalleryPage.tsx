import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IBreedData } from "@/types/CatData";
import useImagesQuery from "@/hooks/useImagesQuery";
import useBreedsQuery from "@/hooks/useBreedsQuery";
import {
  INITIAL_LIMIT_VALUE,
  LIMIT_OPTIONS,
  INITIAL_BREED_VALUE,
} from "@/utils/constants";

const CatGalleryPage = () => {
  const [breedsValue, setBreedValue] = useState<string>(INITIAL_BREED_VALUE);
  const [limitValue, setLimitValue] = useState<string>(
    INITIAL_LIMIT_VALUE.value,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: imagesError,
    isSuccess: isImagesSuccess,
  } = useImagesQuery(limitValue, breedsValue);

  const {
    data: breedsData,
    isLoading: breedsLoading,
    isError: breedsError,
    isSuccess: isBreedsSuccess,
  } = useBreedsQuery();

  useEffect(() => {
    if (breedsValue === INITIAL_BREED_VALUE) {
      searchParams.delete("breed_ids");
    } else {
      searchParams.set("breed_ids", breedsValue);
    }
    setSearchParams(searchParams);
  }, [breedsValue, setSearchParams, searchParams]);

  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setBreedValue(selectedValue);
    setLimitValue(INITIAL_LIMIT_VALUE.value);

    navigate(
      `/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${selectedValue !== INITIAL_BREED_VALUE ? selectedValue : ""}`,
    );
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setLimitValue(selectedValue);

    navigate(`/gallery?limit=${selectedValue}&breed_ids=${breedsValue}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center items-center py-4">
        <div>
          <select
            name="breed"
            id="breed-select"
            value={breedsValue}
            onChange={handleBreedChange}
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
        </div>

        <div>
          <select
            name="limit"
            id="image-limit-select"
            value={limitValue}
            onChange={handleLimitChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value={INITIAL_LIMIT_VALUE.value}>
              {INITIAL_LIMIT_VALUE.label}
            </option>
            {isImagesSuccess &&
              LIMIT_OPTIONS?.map(({ id, value, label }) => {
                if (
                  value !== INITIAL_LIMIT_VALUE.value &&
                  imagesData.totalImagesCount >= +value
                )
                  return (
                    <option key={id} value={value}>
                      {label}
                    </option>
                  );
              })}
          </select>
        </div>
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
            imagesData.images?.map(
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
