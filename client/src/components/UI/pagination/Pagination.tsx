import { MouseEvent } from "react";
import PaginationItem from "./PaginationItem";
import List from "@/components/List/List";
import LeftIcon from "../icons/leftIcon/LeftIcon";
import RightIcon from "../icons/rightIcon/RightIcon";

interface PaginationProps {
  setCurrentPageNumber: (value: string) => void;
  totalPagesNumber: number;
  currentPageNumber: string;
}

const MAX_VISIBLE_PAGES = 7;

const Pagination = ({
  setCurrentPageNumber,
  totalPagesNumber,
  currentPageNumber,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPagesNumber }, (_, i) => i + 1);
  const numericCurrentPageNumber = +currentPageNumber;

  const handleChangeCurrentPage = (e: MouseEvent) => {
    if (e.target && "value" in e.target) {
      const numericValue = Number(e.target.value);
      setCurrentPageNumber(numericValue.toString());
    }
  };

  const startPage = Math.max(
    1,
    Math.min(
      +numericCurrentPageNumber - Math.floor(MAX_VISIBLE_PAGES / 2),
      totalPagesNumber - MAX_VISIBLE_PAGES + 1,
    ),
  );
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPagesNumber);
  const visiblePagesArray = pageNumbers.slice(startPage - 1, endPage);

  const navigateBack = () => {
    const numericCurrentPageValue = +currentPageNumber;
    const updatedPageValue = numericCurrentPageValue - 1;

    setCurrentPageNumber(updatedPageValue.toString());
  };

  const navigateForward = () => {
    const numericCurrentPageValue = +currentPageNumber;
    const updatedPageValue = numericCurrentPageValue + 1;

    setCurrentPageNumber(updatedPageValue.toString());
  };

  return (
    <>
      {+currentPageNumber > 1 && (
        <button
          className="flex justify-center items-center mr-3"
          onClick={navigateBack}
        >
          <LeftIcon />
        </button>
      )}
      <List
        items={visiblePagesArray}
        renderItems={(pageNumber) => (
          <PaginationItem
            pageNumber={pageNumber.toString()}
            currentPageNumber={currentPageNumber}
            key={pageNumber}
          />
        )}
        className="flex gap-3"
        onClick={handleChangeCurrentPage}
      />

      {+currentPageNumber < totalPagesNumber && (
        <button
          className="flex justify-center items-center ml-3"
          onClick={navigateForward}
        >
          <RightIcon />
        </button>
      )}
    </>
  );
};

export default Pagination;
