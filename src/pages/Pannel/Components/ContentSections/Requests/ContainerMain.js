import React, { useState, useEffect, createContext, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import TableComponent from "./Components/TableComponent";
import {
  AcceptRequestReserveApi,
  DeleteRequestReserveApi,
  GetListRequestToReserveApi,
  RejectRequestReserveApi,
} from "../../../../../api/PannelApis";
import SweetAlert from "../../../../../components/SweetAlert/SweetAlert";
import { SignalRContext } from "../../../../../App";

export const ContainerMainContext = createContext();

const ContainerMain = () => {

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState([0, 1, 2, 3, 4, 5, 6, 1001, 1002]); // Default to "همه" tab

  const handleGetMyTour = useCallback(async (dontShowLoading) => {
    if (!dontShowLoading) {
      setLoading(true);
    }

    const result = await GetListRequestToReserveApi(tabValue);

    setStays(result?.data || []);

    setLoading(false);
  }, [tabValue]);

  useEffect(() => {
    handleGetMyTour();
  }, [tabValue, handleGetMyTour]);

  SignalRContext.useSignalREffect("OrderAccept", (message) => {
    console.info(
      message,
      "SignalRContext message useSignalREffect",
      // parseFloat(message?.orderNumber) === parseFloat(code)
    );

    handleGetMyTour(true); //true

  });

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAcceptRequest = async (guid) => {
    setLoading(true);
    const result = await AcceptRequestReserveApi(guid);
    SweetAlert(result?.issuccess, result?.message);
    handleGetMyTour();
  };

  const handleReject = async (guid) => {
    setLoading(true);
    const result = await RejectRequestReserveApi(guid);
    SweetAlert(result?.issuccess, result?.message);
    handleGetMyTour();
  };
  const handleRemoveStay = (stayGuid) => {
    setStays(prevStays => prevStays.filter(stay => stay.guid !== stayGuid));
  };

  const handleDeleteRequest = async (guid) => {
    setLoading(true);
    const result = await DeleteRequestReserveApi(guid);
    SweetAlert(result?.issuccess, result?.message);
    handleGetMyTour();
  };
  
  return (
    <ContainerMainContext.Provider
      value={{
        handleGetMyTour,
        stays,
        loading,
        handleChangeTab,
        tabValue,
        handleAcceptRequest,
        handleReject,
        handleDeleteRequest,
        handleRemoveStay
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
          درخواست‌ها
        </Typography>

        <Box
          sx={{
            p: 0,
            minHeight: { xs: "auto", md: "70vh" },
          }}
          className="shadow border rounded"
        >
          <TableComponent stays={stays} loading={loading} />
        </Box>
      </Box>
    </ContainerMainContext.Provider>
  );
};

export default ContainerMain;
