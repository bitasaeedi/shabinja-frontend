import React, { useState, useEffect, createContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TableComponent from "./Components/TableComponent";
import { MyReservationsApi } from "../../../../../../../api/toureApis";

export const ContainerMainContext = createContext();
const ContainerMain = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    handleGetMyReserve();
  }, [tabValue]);

  const handleGetMyReserve = async (dontShowLoading) => {
    if (!dontShowLoading) {
      setLoading(true);
    }
    const searchTab = {
      tabValue: tabValue,
    };
    const result = { data: [1, 2, 3, 4, 5] }; //await MyReservationsApi(searchTab);
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
        handleGetMyReserve,
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
          mt: 4,
        }}
      >
        <Typography
          variant="h6"
          align="right"
          gutterBottom
          sx={{
            fontSize: "16px",
            // display: { xs: "none", md: "flex" },
          }}
        >
          تراکنش‌ها (5)
        </Typography>

        <Box
          sx={{
            p: 0,
            minHeight: { xs: "auto", md: "70vh" },
            mx: 0,
          }}
          className="  rounded"
        >
          {/* Table for Desktop */}
          <TableComponent stays={stays} loading={loading} />
        </Box>
      </Box>
    </ContainerMainContext.Provider>
  );
};

export default ContainerMain;
