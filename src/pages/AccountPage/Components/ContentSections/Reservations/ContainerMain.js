import React, { useState, useEffect, createContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TableComponent from "./Components/TableComponent";
import { MyReservationsApi } from "../../../../../api/toureApis";

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
    var boolValue = null;
    if (tabValue === 0) {
       boolValue = true;
    } else {
       boolValue = false;
    }
    const result = await MyReservationsApi(boolValue);
    let listReserve = result?.data || [];
    
    console.log(listReserve, "listReserve");
    
    if (tabValue === 2) {
      listReserve = listReserve.filter((item) => item.state === 6);
    }
    setStays(listReserve);

    setLoading(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRemoveStay = (stayGuid) => {
    setStays(prevStays => prevStays.filter(stay => stay.guid !== stayGuid));
  };

  return (
    <ContainerMainContext.Provider
      value={{
        handleGetMyReserve,
        stays,
        loading,
        handleChangeTab,
        tabValue,
        handleRemoveStay,
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
          رزروهای من
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
