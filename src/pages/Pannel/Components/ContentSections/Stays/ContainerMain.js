import React, { useState, useEffect, createContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TableComponent from "./Components/TableComponent";
import { MyHostTourSearchApi } from "../../../../../api/toureApis";

export const ContainerMainContext = createContext();
const ContainerMain = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    handleGetMyTour();
  }, [tabValue]);

  const handleGetMyTour = async (dontShowLoading) => {
    if (!dontShowLoading) {
      setLoading(true);
    }
    const searchTab = {
      tabValue: tabValue,
    };
    const result = await MyHostTourSearchApi(searchTab);
    if (tabValue === 1) {
      setStays([]);
    } else {
      setStays(result?.data || []);
    }

    setLoading(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ContainerMainContext.Provider
      value={{
        handleGetMyTour,
        stays,
        loading,
        handleChangeTab,
        tabValue,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          mx: "auto",
        }}
      >
        <Typography
          variant="h6"
          align="right"
          gutterBottom
          sx={{
            fontSize: "18px",
            display: { xs: "none", md: "flex" },
          }}
        >
          اقامتگاه‌ها
        </Typography>

        <Box
          sx={{
            p: 0,
            minHeight: { xs: "auto", md: "70vh" },
          }}
          className="shadow border rounded"
        >
          {/* Table for Desktop */}
          <TableComponent stays={stays} loading={loading} />
        </Box>
      </Box>
    </ContainerMainContext.Provider>
  );
};

export default ContainerMain;
