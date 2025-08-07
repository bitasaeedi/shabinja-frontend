import React, { useContext, useState } from "react";
import {
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";

import RowTable from "./RowTable";
import SkeltonRowTables from "../../../../../../../../components/SkeletonComponents/SkeltonRowTables";
import { ContainerMainContext } from "../ContainerMain";
import { SearchOff } from "@mui/icons-material";

const HeaderTable = () => {
  return (
    <TableRow sx={{}}>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        عنوان
      </TableCell>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        مبلغ
      </TableCell>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        کد تراکنش
      </TableCell>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        تاریخ
      </TableCell>
      <TableCell
        align="left"
        sx={{
          color: "#90a4ae",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        ساعت
      </TableCell>
    </TableRow>
  );
};

const NoValueComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        pt: 3,
        mt: 4,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <SearchOff sx={{ fontSize: { xs: 40, md: 60 }, color: "#aaa", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        هیچ تراکنشی برای نمایش وجود ندارد
      </Typography>
      <Typography variant="body2" color="text.secondary">
        لطفاً فیلترهای جستجوی خود را بررسی کنید.
      </Typography>
    </Box>
  );
};

const TableComponent = ({ stays, loading = true }) => {
  const containerMainContext = useContext(ContainerMainContext);
  console.log("stays", loading);

  const HeaderTable = () => {
    return (
      <TableRow sx={{}}>
        {stays?.typeCostDisplay && (
          <TableCell
            align="left"
            sx={{
              color: "#90a4ae",
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            عنوان
          </TableCell>
        )}

        <TableCell
          align="left"
          sx={{
            color: "#90a4ae",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
          }}
        >
          مبلغ
        </TableCell>
        <TableCell
          align="left"
          sx={{
            color: "#90a4ae",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
          }}
        >
          کد تراکنش
        </TableCell>
        <TableCell
          align="left"
          sx={{
            color: "#90a4ae",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
          }}
        >
          تاریخ
        </TableCell>
        <TableCell
          align="left"
          sx={{
            color: "#90a4ae",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
          }}
        >
          ساعت
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          // border: "1px solid #e0e0e0",
          borderRadius: "8px",
          overflowX: "auto", // Enables horizontal scrolling for smaller screens
          mt: 0,
        }}
      >
        {/* tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={containerMainContext?.tabValue}
            onChange={containerMainContext?.handleChangeTab}
            aria-label=" tabs "
            TabIndicatorProps={{
              sx: { backgroundColor: "#424242", height: "1px" },
            }}
            sx={{
              "& .MuiTab-root": {
                minWidth: "auto", // Auto width based on text
                padding: "6px 12px", // Adjust padding for better spacing
                color: "#9e9e9e", // Default color for inactive tabs
              },
              "& .Mui-selected": {
                color: "#424242", // Active tab color
                fontWeight: "bold", // Optional: Make it bold for better visibility
              },
            }}
          >
            <Tab label="کیف پول" />
            <Tab label="درخواست برداشت" />
          </Tabs>
        </Box>

        {(!stays || stays.length === 0) && !loading ? (
          <NoValueComponent />
        ) : (
          <Table>
            <TableHead>
              <HeaderTable />
            </TableHead>
            <TableBody>
              {loading
                ? [1, 2, 3, 4, 5].map((_, index) => (
                    <SkeltonRowTables count={5} key={index} />
                  ))
                : stays.map((stay, index) => (
                    <RowTable stay={stay} key={index} index={index} />
                  ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* {!loading && (
        <Box
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            position: "sticky",
            bottom: 0,
          }}
        >
          <Box sx={{}}>
            <Button
              variant="contained"
              component={Link}
              endIcon={<AddIcon />}
              to="/new-stay/start"
              sx={{ my: 1 }}
            >
              افزودن اقامتگاه جدید
            </Button>
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default TableComponent;
