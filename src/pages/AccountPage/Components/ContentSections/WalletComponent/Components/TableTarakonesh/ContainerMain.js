import React, { useState, useEffect, createContext } from "react";
import { Box, Typography } from "@mui/material";
import TableComponent from "./Components/TableComponent";
import axios from "axios";
// import { MyReservationsApi } from "../../../../../../../api/toureApis";
import API_URL from "../../../../../../../config/apiConfig";

export const ContainerMainContext = createContext();
const baseUrl = API_URL;

const ContainerMain = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    handleGetMyReserve();
  }, [tabValue]);

  // const handleGetMyReserve = async (dontShowLoading) => {
  //   if (!dontShowLoading) {
  //     setLoading(true);
  //   }
  //   const searchTab = {
  //     tabValue: tabValue,
  //   };

  //   const result = { data: [1, 2, 3, 4, 5] }; //await MyReservationsApi(searchTab);
  //   if (tabValue === 1) {
  //     setStays([]);
  //   } else {
  //     setStays(result?.data || []);
  //   }

  //   setLoading(false);
  // };

  const handleGetMyReserve = async (dontShowLoading) => {
    if (!dontShowLoading) {
      setLoading(true);
    }

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(`${baseUrl}/Wallet/List`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response bardasht", response?.data?.data);
      setStays(response?.data?.data);
      
    } catch (error) {
      console.error(
        "Error:",
        error?.response?.data || error.message
      );
      return error?.response?.data;
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
          تراکنش‌ها ({stays?.length||0})
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
