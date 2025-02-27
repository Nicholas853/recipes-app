import { Button, Stack } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const paginationRange = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1);
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      if (currentPage < 4) endPage = 7;
      if (currentPage > totalPages - 4) startPage = totalPages - 6;
      if (startPage > 2) range.push('...');
      for (let i = startPage; i <= endPage; i++) range.push(i);
      if (endPage < totalPages - 1) range.push('...');
      range.push(totalPages);
    }
    return range;
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" my={4}>
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}>
        Previous
      </Button>
      {paginationRange().map((pageNum, index) => (
        <Button
          key={index}
          variant={pageNum === currentPage ? 'contained' : 'outlined'}
          onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
          disabled={pageNum === '...'}>
          {pageNum}
        </Button>
      ))}
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}>
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
