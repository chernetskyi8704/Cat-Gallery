import { MouseEvent } from "react";

import PaginationItem from "./PaginationItem";
import List from "@/components/List/List";

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
    <List
      items={pageNumbers}
      renderItems={(pageNumber) => (
        <PaginationItem pageNumber={pageNumber.toString()} key={pageNumber} />
      )}
      className="flex gap-3"
      onClick={handleChangeCurrentPage}
    />
  );
};

export default Pagination;
