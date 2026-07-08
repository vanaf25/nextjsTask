import { Button } from "@/components/ui/Button";

type PaginationProps = {
  currentPage: number;
  isDisabled: boolean;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
  totalPages: number;
};

export function Pagination({
  currentPage,
  isDisabled,
  onPageChange,
  pageNumbers,
  totalPages,
}: PaginationProps) {
  return (
    <nav
      aria-label="Posts pagination"
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-slate-600">
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
