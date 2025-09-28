import React, { useContext } from "react";
import {
  Box,
  Paper,
  Skeleton,
  Tab,
  TableContainer,
  Tabs,
  Typography,
} from "@mui/material";


import CardStays from "./CardStays";

import { ContainerMainContext } from "../ContainerMain";
import { SearchOff } from "@mui/icons-material";

const TableComponent = ({ stays, loading = true }) => {
  const containerMainContext = useContext(ContainerMainContext);

  const listTabs = [
    {
      name: "همه",
      valueFilter: [0, 1, 2, 3, 4, 5, 6, 1001, 1002],
      tabValue: 0, // Single value for MUI Tabs
    },
    {
      name: "جاری",
      valueFilter: [0,1,2,3],
      tabValue: 1,
    },
    {
      name: "تکمیل شده",
      valueFilter: [1002],
      tabValue: 2,
    },
    {
      name: "لغوشده / ناموفق",
      valueFilter: [4, 5, 6, 1001],
      tabValue: 3,
    },
  ];

  // Find the current selected tab based on the tabValue array
  const getCurrentTabValue = () => {
    const currentTab = listTabs.find(tab => 
      JSON.stringify(tab.valueFilter) === JSON.stringify(containerMainContext?.tabValue)
    );
    return currentTab ? currentTab.tabValue : 0; // Default to first tab
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
          pt: 4,
          mt: 4,
          textAlign: "center",
          color: "text.secondary",
          pb:{xs:6,md:0}
        }}
      >
        <SearchOff sx={{ fontSize: 60, color: "#aaa", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          هیچ رزروی برای نمایش وجود ندارد
        </Typography>
        <Typography variant="body2" color="text.secondary">
          لطفاً فیلترهای جستجوی خود را بررسی کنید یا یک رزرو جدید اضافه کنید.
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
            value={getCurrentTabValue()}
            onChange={(event, newValue) => {
              // Find the tab that matches the selected tabValue
              const selectedTab = listTabs.find(tab => tab.tabValue === newValue);
              if (selectedTab) {
                containerMainContext?.handleChangeTab(event, selectedTab.valueFilter);
              }
            }}
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
            {listTabs?.map((item, index) => (
              <Tab label={item?.name} key={index} value={item?.tabValue} />
            ))}
          </Tabs>
        </Box>
        {(!stays || stays.length === 0) && !loading ? (
          <NoValueComponent />
        ) : (
          <>
            <Box sx={{ width: "100%", p: 2 }}>
              {" "}
              {loading ? (
                <Box sx={{ width: "100%" }}>
                  {[1, 2, 3, 4].map((item, index) => (
                    <Box key={index} sx={{ height: 100 }}>
                      <Skeleton
                        sx={{
                          width: "100%",
                          height: "100%",
                          my: 0,
                          mb: 0,
                          py: 0,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                stays.map((stay, index) => (
                  <CardStays 
                    stay={stay} 
                    key={index} 
                    index={index} 
                    onRemove={containerMainContext?.handleRemoveStay}
                  />
                ))
              )}
            </Box>
          </>
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
            {/* <Button
              variant="contained"
              component={Link}
              endIcon={<AddIcon />}
              to="/new-stay/start"
              sx={{ my: 1 }}
            >
              افزودن اقامتگاه جدید
            </Button> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TableComponent;
