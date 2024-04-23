import {useMemo} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationPage({
  page,
  pages,
  onPageChange,
}: PaginationProps) {
  const pageNumber = useMemo(() => {
    const pageNumberArr = [];
    for (let i = 1; i <= pages; i++) {
      pageNumberArr.push(i);
    }
    return pageNumberArr;
  }, [pages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page > 1 && (
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          )}
        </PaginationItem>
        {pageNumber.map((number) => (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumber.length && pageNumber.length !== 0 && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
