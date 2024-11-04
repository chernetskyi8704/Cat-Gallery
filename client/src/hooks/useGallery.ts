import React, { useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useImagesQuery from "./useImagesQuery";
import useBreedsQuery from "./useBreedsQuery";
import {
  INITIAL_BREED_VALUE,
  INITIAL_PAGE_NUMBER,
  INITIAL_LIMIT_VALUE,
} from "@/utils/constants";

const useGallery = () => {
  const [searchParams] = useSearchParams();
  const currentLimitValue =
    searchParams.get("limit") || INITIAL_LIMIT_VALUE.value;
  const currentPageNumber = searchParams.get("page") || INITIAL_PAGE_NUMBER;
  const currentBreedValue =
    searchParams.get("breed_ids") || INITIAL_BREED_VALUE;

  const navigate = useNavigate();

  const { data: imagesData } = useImagesQuery({
    limit: currentLimitValue,
    breedsValue: currentBreedValue,
    page: currentPageNumber,
  });

  const { data: breedsData } = useBreedsQuery();

  const handleBreedChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      navigate(
        `/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${selectedValue !== INITIAL_BREED_VALUE ? selectedValue : ""}&page=${INITIAL_PAGE_NUMBER}`,
      );
    },
    [navigate],
  );

  const handleImageClick = useCallback(
    (breedImageId: string) => {
      if (!breedImageId) return;
      navigate(
        `/gallery?limit=${INITIAL_LIMIT_VALUE.value}&breed_ids=${breedImageId}&page=${INITIAL_PAGE_NUMBER}`,
      );
    },
    [navigate],
  );

  const handleLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      if (!selectedValue) return;
      navigate(
        `/gallery?limit=${selectedValue}&breed_ids=${currentBreedValue}&page=${INITIAL_PAGE_NUMBER}`,
      );
    },
    [navigate, currentBreedValue],
  );

  const handleChangePageNumber = useCallback(
    (pageNumber: string) => {
      if (!pageNumber) return;
      navigate(
        `/gallery?limit=${currentLimitValue}&breed_ids=${currentBreedValue}&page=${pageNumber}`,
      );
    },
    [navigate, currentLimitValue, currentBreedValue],
  );

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    currentBreedValue,
    currentLimitValue,
    currentPageNumber,
    imagesData,
    breedsData,
    handleBreedChange,
    handleLimitChange,
    handleChangePageNumber,
    handleImageClick,
    navigateBack,
  };
};

export default useGallery;
