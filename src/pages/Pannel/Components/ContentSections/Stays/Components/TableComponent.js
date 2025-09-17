import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tabs,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";  
import AddIcon from "@mui/icons-material/Add";
import RowTable from "./RowTable";
import HeaderTable from "./HeaderTable";
import SkeltonRowTables from "../../../../../../components/SkeletonComponents/SkeltonRowTables";
import { ContainerMainContext } from "../ContainerMain";
import { SearchOff } from "@mui/icons-material";
const TableComponent = ({ stays, loading = true }) => {
  const containerMainContext = useContext(ContainerMainContext);


  const NoValueComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          pt: 4,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <SearchOff sx={{ fontSize: 60, color: "#aaa", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          هیچ اقامتگاهی برای نمایش وجود ندارد
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          شما می‌توانید با کلیک روی دکمه زیر، اقامتگاه جدیدی اضافه کنید.
        </Typography>
      </Box>
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
            <Tab label="همه" />
            <Tab label="تایید شده" />
            <Tab label="درخواست" />
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
                    <SkeltonRowTables count={4} />
                  ))
                : stays
                    .filter(stay => {
                      if (containerMainContext?.tabValue === 0) return true;
                      if (containerMainContext?.tabValue === 1) return stay.statusTour === 1;
                      if (containerMainContext?.tabValue === 2) return stay.statusTour === 0||stay.statusTour === 2;
                      return true;
                    })
                    .map((stay, index) => (
                      <RowTable stay={stay} key={index} index={index} />
                    ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {!loading && (
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
              to={stays?.length > 0 ? "/new-stay/wizard" : "/new-stay/start"}
              sx={{ my: 1 }}
            >
              افزودن اقامتگاه جدید
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TableComponent;
