import { Box, Grid } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RequestToReserveApi } from "../../api/toureApis";
import { AppContext } from "../../App";
import CardInfoReserve from "./Components/CardInfoReserve";
import ShowInfoOfReserve from "./Components/ShowInfoOfReserve";
import StepperReserve from "./Components/StepperReserve";
import WaitingToPay from "./Components/WaitingToPay";

export const ReservationStayContext = createContext();

const ReservationStay = () => {
  // stepName is preview or preorder
  const { stepName, code } = useParams();
  const appContext = useContext(AppContext);
  const [infoOfReserve, setInfoOfReserve] = useState({});
  const [paramsValues, setParamsValues] = useState({
    count: 0,
    start: "",
    end: "",
  });
  const [inputeValue, setInputeValues] = useState({});
  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
  }, []);

  useEffect(() => {
    if (stepName === "preview") {
      // پیش نمایش قبل از ثبت درخواست
      handleGetPreview();
    } else if (stepName === "preorder") {
      // پیش نمایش رزرو
      handleGetInfoOfReserve();
    }
  }, [code, stepName]);

  //   آپدیت پارامترهای داخل ادرس صفحه
  const handleSetParams = (lable, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(lable, value);
    const newSearch = params.toString();
    window.history.replaceState(null, "", `?${newSearch}`);
    handleGetPreview();
  };

  const handleGetPreview = () => {
    const params = handleFindeParams(); // دریافت مقادیر درون ادرس صفحه

    console.log(params, "params ");
    // ارسال به بکند و دریافت اطلاعات
    const result = {};
    //  result = apirequest(params)
    const exitEdData = { ...params };
    setInfoOfReserve(exitEdData);
    return exitEdData;
  };

  //  اطلاعات رزرو
  const handleGetInfoOfReserve = () => {
    const result = {};
    //  result = apirequest(code)
    const exitEdData = {};
    setInfoOfReserve(exitEdData);
  };

  // جستجوی مشخصات سرچ
  const handleFindeParams = () => {
    const params = new URLSearchParams(window.location.search);
    const values = Object.fromEntries([...params]);
    const myData = {
      stayId: code,
      start: values?.start,
      end: values?.end,
      count: values?.count,
    };
    setParamsValues(myData);
    return myData;
  };

  // ثبت درخواست رزرو
  const handleRequestToReserve = async () => {
    console.log(inputeValue, paramsValues, "handleRequestToReserve");
    // await RequestToReserveApi();
  };

  // آپدیت مقدار جدید
  const handleUpdateInputeValue = (data) => {
    console.log(data, "handleUpdateInputeValue");
    setInputeValues({ ...inputeValue, ...data });
  };
  return (
    <ReservationStayContext.Provider
      value={{
        infoOfReserve,
        stepName,
        handleSetParams,
        paramsValues,
        handleRequestToReserve,
        handleUpdateInputeValue,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          padding: { xs: 2, md: 0 },
          pb: 10,
          mb: 10,
        }}
      >
        <Box
          sx={{
            height: { xs: 9, md: 100 },
          }}
        ></Box>

        {/* Main layout container */}
        <Grid container spacing={2}>
          {/* First Grid - Auto width on desktop, full width on mobile */}
          <Grid
            item
            xs={12}
            lg="auto"
            sx={{
              minWidth: { lg: 350 }, // Set a minimum width for desktop
              maxWidth: { lg: 450 }, // Set a maximum width for desktop
              order: { xs: 2, lg: 1 },
            }}
          >
            <CardInfoReserve />
          </Grid>

          {/* Second Grid - Takes remaining space on desktop, full width on mobile */}
          <Grid
            item
            xs={12}
            lg
            sx={{
              flexGrow: 1,
              order: { xs: 1, lg: 2 },
              // Remove the red background - it was just for debugging
            }}
          >
            <Box sx={{ px: { xs: 0, md: 4 } }}>
              <StepperReserve />
              {/* <WaitingToPay /> */}
              <ShowInfoOfReserve />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ReservationStayContext.Provider>
  );
};

export default ReservationStay;
