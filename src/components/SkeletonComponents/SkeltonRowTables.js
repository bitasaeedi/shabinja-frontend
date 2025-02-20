import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

const SkeltonRowTables = ({ count = 5 }) => {
  return (
    <TableRow>
      {Array.from({ length: count }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton variant="text" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeltonRowTables;
