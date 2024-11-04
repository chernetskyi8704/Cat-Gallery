interface PaginationItemProps {
  pageNumber: string;
  currentPageNumber: string;
}

const PaginationItem = ({
  pageNumber,
  currentPageNumber,
}: PaginationItemProps) => {
  return (
    <li
      className={`flex h-10 w-10 items-center justify-center cursor-pointer rounded-full 
        ${currentPageNumber === pageNumber ? "bg-active text-inactive" : "bg-inactive text-active"}
        hover:bg-active hover:text-[#d8e8f2]`}
      value={pageNumber}
      key={pageNumber}
      tabIndex={0}
    >
      {pageNumber}
    </li>
  );
};

export default PaginationItem;
