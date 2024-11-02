import { INITIAL_LIMIT_VALUE, LIMIT_OPTIONS } from "@/utils/constants";
import Pagination from "@/components/UI/pagination/Pagination";
import useGallery from "@/hooks/useGallery";
import BreedSelect from "@/components/BreedSelect/BreedSelect";
import LimitSelect from "@/components/LimitSelect/LimitSelect";
import Loader from "@/components/UI/loader/Loader";
import ImageItem from "@/components/ImageItem/ImageItem";
import List from "@/components/List/List";

const CatGalleryPage = () => {
  const {
    breedsValue,
    limitValue,
    imagesData,
    isImagesLoading,
    isImagesError,
    isImagesSuccess,
    breedsData,
    isBreedsLoading,
    isBreedsError,
    isBreedsSuccess,
    handleBreedChange,
    handleLimitChange,
    handleChangePageNumber,
    setBreedValue,
  } = useGallery();

  if (isImagesLoading || isBreedsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-[50px] h-[50px]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex flex-col">
      {imagesData && breedsData && (
        <div className="flex justify-center sm:justify-end items-center gap-5 py-4 w-full px-0 sm:px-8 md:px-14">
          <BreedSelect
            breedsValue={breedsValue}
            handleBreedChange={handleBreedChange}
            breedsData={breedsData}
            isBreedsSuccess={isBreedsSuccess}
          />

          <LimitSelect
            limitValue={limitValue}
            handleLimitChange={handleLimitChange}
            imagesData={imagesData}
            isImagesSuccess={isImagesSuccess}
            initialLimitValue={INITIAL_LIMIT_VALUE}
            limitOptionsArray={LIMIT_OPTIONS}
          />
        </div>
      )}

      <div className="flex-1 flex justify-center px-4 sm:px-8 md:px-14">
        <div
          className={`${
            isImagesLoading ? "flex" : ""
          } columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5`}
        >
          {isImagesSuccess && imagesData && (
            <List
              items={imagesData.images}
              renderItems={(image) => {
                const { name, vetstreet_url, id: breedId } = image.breeds[0];
                return (
                  <ImageItem
                    breedsValue={breedsValue}
                    setBreedValue={setBreedValue}
                    image={image}
                    vetstreet_url={vetstreet_url || ""}
                    name={name}
                    breedId={breedId}
                    key={image.id}
                  />
                );
              }}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center my-4">
        {imagesData && (
          <Pagination
            setCurrentPageNumber={handleChangePageNumber}
            totalPagesCount={imagesData.totalPagesCount}
          />
        )}
      </div>

      {isImagesError && (
        <p className="text-center text-red-600">Image upload error!</p>
      )}

      {isBreedsError && (
        <p className="text-center text-red-600">
          An error occurred while loading breeds!
        </p>
      )}
    </div>
  );
};

export default CatGalleryPage;
