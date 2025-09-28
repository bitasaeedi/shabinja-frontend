import React, { useState, useEffect, createContext, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import TableComponent from "./Components/TableComponent";
import { MyReservationsApi } from "../../../../../api/toureApis";
import { SignalRContext } from "../../../../../App";

export const ContainerMainContext = createContext();
const ContainerMain = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState([0, 1, 2, 3, 4, 5, 6, 1001, 1002]); // Default to "همه" tab

  const handleGetMyReserve = useCallback(async (dontShowLoading) => {
    if (!dontShowLoading) {
      setLoading(true);
    }

    const result = await MyReservationsApi(tabValue);

    setStays(result?.data || []);

    setLoading(false);
  }, [tabValue]);

  useEffect(() => {
    handleGetMyReserve();
  }, [tabValue, handleGetMyReserve]);

  SignalRContext.useSignalREffect("OrderAccept", (message) => {
    console.info(
      message,
      "SignalRContext message useSignalREffect",
      // parseFloat(message?.orderNumber) === parseFloat(code)
    );
      handleGetMyReserve(true); //true
    // setMessage([...messages, message]);
  });

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
