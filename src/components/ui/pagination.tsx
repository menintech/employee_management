import { Button } from "./button";

type PaginationProps = {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 disabled:opacity-50"
      >
        First
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 disabled:opacity-50"
      >
        Previous
      </Button>
      <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 disabled:opacity-50"
      >
        Next
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 disabled:opacity-50"
      >
        Last
      </Button>
    </div>
  );
}
