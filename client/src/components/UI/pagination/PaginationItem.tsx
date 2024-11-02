import { INITIAL_PAGE_NUMBER } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

interface PaginationItemProps {
  pageNumber: string;
}

const PaginationItem = ({ pageNumber }: PaginationItemProps) => {
  const [searchParams] = useSearchParams();
  const currentPageNumber = searchParams.get("page") || INITIAL_PAGE_NUMBER;

  return (
    <li
      className={`flex h-10 w-10 items-center justify-center cursor-pointer rounded-full 
      ${currentPageNumber === pageNumber ? "bg-active text-[#d8e8f2] animate-background-animation" : "bg-inactive text-[#000]"}
      hover:bg-active hover:text-[#d8e8f2]`}
      value={pageNumber}
      key={pageNumber}
    >
      {pageNumber}
    </li>
  );
};

export default PaginationItem;
