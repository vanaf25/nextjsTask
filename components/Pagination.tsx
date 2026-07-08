import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { usePostsStore } from "@/stores/posts-store";
import { createPageNumbers, getTotalPages } from "@/utils/posts";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalCount = usePostsStore((state) => state.totalCount);
  const isLoading = usePostsStore((state) => state.isLoading);
  const error = usePostsStore((state) => state.error);
  const isDisabled = isLoading || Boolean(error);
  const totalPages = getTotalPages(totalCount);
  const pageNumbers = useMemo(
    () => createPageNumbers(totalPages),
    [totalPages],
  );

  return (
    <nav
      aria-label="Posts pagination"
      className="card flex flex-col gap-3 border border-base-300 bg-base-100 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm opacity-70">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          disabled={isDisabled || currentPage === 1}
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            disabled={isDisabled}
            size="page"
            type="button"
            variant={pageNumber === currentPage ? "primary" : "secondary"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          disabled={isDisabled || currentPage === totalPages}
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
