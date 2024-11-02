import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useImagesQuery from "./useImagesQuery";
import useBreedsQuery from "./useBreedsQuery";
import {
  INITIAL_BREED_VALUE,
  INITIAL_PAGE_NUMBER,
  INITIAL_LIMIT_VALUE,
} from "@/utils/constants";

const useGallery = () => {
  const [currentPageNumber, setCurrentPageNumber] =
    useState(INITIAL_PAGE_NUMBER);
  const [breedsValue, setBreedValue] = useState(INITIAL_BREED_VALUE);
  const [limitValue, setLimitValue] = useState(INITIAL_LIMIT_VALUE.value);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
    isSuccess: isImagesSuccess,
  } = useImagesQuery(limitValue, breedsValue, currentPageNumber);

  const {
    data: breedsData,
    isLoading: isBreedsLoading,
    isError: isBreedsError,
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
    setCurrentPageNumber(INITIAL_PAGE_NUMBER);
    navigate(
      `/gallery?limit=${selectedValue}&breed_ids=${breedsValue}&page=${INITIAL_PAGE_NUMBER}`,
    );
  };

  const handleChangePageNumber = (pageNumber: string) => {
    setCurrentPageNumber(pageNumber);
    navigate(
      `/gallery?limit=${limitValue}&breed_ids=${breedsValue}&page=${pageNumber}`,
    );
  };

  return {
    currentPageNumber,
    breedsValue,
    limitValue,
    imagesData,
    breedsData,
    isImagesLoading,
    isImagesError,
    isImagesSuccess,
    isBreedsLoading,
    isBreedsError,
    isBreedsSuccess,
    handleBreedChange,
    handleLimitChange,
    handleChangePageNumber,
    setBreedValue,
  };
};

export default useGallery;
