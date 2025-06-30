import { Box, Grid } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HostTourSearchOneApi,
  PriceCalculationApi,
  RequestToReserveApi,
} from "../../api/toureApis";
import { AppContext } from "../../App";
import StepperReserve from "../../components/Stepers/StepperReserve";
import CardInfoReserve from "./Components/CardInfoReserve";
import ShowInfoOfReserve from "./Components/ShowInfoOfReserve";

import WaitingToPay from "./Components/WaitingToPay";

export const ReservationStayContext = createContext();

const ReservationStay = () => {
  const navigate = useNavigate();

  // stepName is preview or preorder
  const { stepName, code } = useParams();
  const appContext = useContext(AppContext);
  const [infoOfReserve, setInfoOfReserve] = useState({});
  const [infoOfStay, setInfoOfStay] = useState({});
  const [paramsValues, setParamsValues] = useState({
    count: 0,
    start: "",
    end: "",
  });
  const [inputeValue, setInputeValues] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
  }, []);

  useEffect(() => {
    if (stepName === "preview") {
      handleGetInfoOfStay();
      // پیش نمایش قبل از ثبت درخواست
      handleGetPreview();
    } else if (stepName === "preorder") {
      // پیش نمایش رزرو
      handleGetInfoOfReserve();
    }
  }, [code, stepName]);

  const handleGetInfoOfStay = async () => {
    setInfoOfStay({});
    const resultGetTour = await HostTourSearchOneApi(code);
    var item = resultGetTour?.data;
    console.log(item, "item");
    const mystay = {
      title: item?.title,
      address: item?.address,
      img: item?.hostImages[0],
      minCount: item?.minCapacity,
      maxCount: item?.maxCapacity,
    };
    setInfoOfStay(mystay);
  };
  //   آپدیت پارامترهای داخل ادرس صفحه
  const handleSetParams = (lable, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(lable, value);
    const newSearch = params.toString();
    window.history.replaceState(null, "", `?${newSearch}`);
    handleGetPreview();
  };

  // مشاهده اطلاعات اقامتگاه
  const handleGetPreview = async () => {
    setLoadingPrices(true);
    const params = handleFindeParams(); // دریافت مقادیر درون ادرس صفحه
    const result = await PriceCalculationApi(
      params?.stayId,
      params?.start,
      params?.end,
      params?.count
    );
    const exitEdData = result?.data;
    setInfoOfReserve(exitEdData);
    setLoadingPrices(false);
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
    const dataToSend = {
      hostTourId: paramsValues?.stayId,
      start: paramsValues?.start,
      end: paramsValues?.end,
      personCount: paramsValues?.count,
      fullName: inputeValue?.name + " " + inputeValue?.lastName,
      mobile: inputeValue?.sms,
    };
    const result = await RequestToReserveApi(dataToSend);
    console.log(result, "result");
    if (result?.data?.orderNumber) {
      const url = `/book/preorder/${result?.data?.orderNumber}`;
      navigate(url);
    }
  };

  // آپدیت مقدار جدید
  const handleUpdateInputeValue = (data) => {
    var newValue = { ...inputeValue, ...data };
    setInputeValues(newValue);
    console.log(newValue, "newValue , ", data);
  };
  return (
    <ReservationStayContext.Provider
      value={{
        infoOfReserve,
        stepName,
        code,
        handleSetParams,
        paramsValues,
        inputeValue,
        handleRequestToReserve,
        handleUpdateInputeValue,
        infoOfStay,
        loadingPrices,
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
              <StepperReserve
                errorTab={false}
                activeStep={1}
                steps={["ثبت درخواست", "تایید میزبان", "پرداخت", "تحویل کلید"]}
              />

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
