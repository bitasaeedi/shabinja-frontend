import { TableCell, TableRow } from "@mui/material";
import React from "react";

const HeaderTable = () => {
  return (
    <TableRow sx={{}}>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
        }}
      >
        عنوان
      </TableCell>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
        }}
      >
        کد
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: "#90a4ae",
        }}
      >
        وضعیت
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: "#90a4ae",
        }}
      >
        عملیات
      </TableCell>
    </TableRow>
  );
};

export default HeaderTable;
