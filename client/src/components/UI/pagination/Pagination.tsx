import { MouseEvent } from "react";

import PaginationItem from "./PaginationItem";

interface PaginationProps {
  setCurrentPageNumber: (value: string) => void;
  totalPagesCount: number;
}

const Pagination = ({
  setCurrentPageNumber,
  totalPagesCount,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  const handleChangeCurrentPage = (e: MouseEvent) => {
    if (e.target && "value" in e.target) {
      const numericValue = Number(e.target.value);
      setCurrentPageNumber(numericValue.toString());
    }
  };

  return (
    <ul className="flex gap-3" onClick={handleChangeCurrentPage}>
      {pageNumbers.map((pageNumber) => (
        <PaginationItem pageNumber={pageNumber.toString()} key={pageNumber} />
      ))}
    </ul>
  );
};

export default Pagination;
