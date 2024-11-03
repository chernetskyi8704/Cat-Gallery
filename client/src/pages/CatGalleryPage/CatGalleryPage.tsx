import { INITIAL_LIMIT_VALUE, LIMIT_OPTIONS } from "@/utils/constants";
import Pagination from "@/components/UI/pagination/Pagination";
import useGallery from "@/hooks/useGallery";
import BreedSelect from "@/components/BreedSelect/BreedSelect";
import LimitSelect from "@/components/LimitSelect/LimitSelect";
import ImageItem from "@/components/ImageItem/ImageItem";
import List from "@/components/List/List";
import NavigateBackButton from "@/components/NavigateBackButton/NavigateBackButton";

const CatGalleryPage = () => {
  const {
    currentBreedValue,
    currentLimitValue,
    imagesData,
    breedsData,
    handleBreedChange,
    handleLimitChange,
    handleChangePageNumber,
    handleImageClick,
    navigateBack,
  } = useGallery();

  return (
    <div className="grow flex flex-col px-0 sm:px-8 md:px-14">
      {imagesData && breedsData && (
        <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end items-center gap-5 py-4 w-full">
          <NavigateBackButton navigateBack={navigateBack}>
            Go Back
          </NavigateBackButton>

          <BreedSelect
            breedsValue={currentBreedValue}
            handleBreedChange={handleBreedChange}
            breedsData={breedsData}
          />

          <LimitSelect
            limitValue={currentLimitValue}
            handleLimitChange={handleLimitChange}
            imagesData={imagesData}
            initialLimitValue={INITIAL_LIMIT_VALUE}
            limitOptionsArray={LIMIT_OPTIONS}
          />
        </div>
      )}

      <div className="flex-1 flex justify-center mt-4 px-4 sm:px-8 md:px-14 overflow-auto">
        {imagesData && (
          <List
            items={imagesData.images}
            renderItems={(image) => {
              if (!image.breeds) return;
              const { name, vetstreet_url, id: breedId } = image.breeds[0];
              return (
                <ImageItem
                  breedsValue={currentBreedValue}
                  handleImageClick={handleImageClick}
                  image={image}
                  vetstreet_url={vetstreet_url || ""}
                  name={name}
                  breedId={breedId}
                  key={image.id}
                />
              );
            }}
            className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5`}
          />
        )}
      </div>

      <div className="flex justify-center my-4">
        {imagesData && (
          <Pagination
            setCurrentPageNumber={handleChangePageNumber}
            totalPagesCount={imagesData.totalPagesCount}
          />
        )}
      </div>
    </div>
  );
};

export default CatGalleryPage;
