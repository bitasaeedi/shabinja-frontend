import { Box, Grid, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetLinkPayReserveApi } from "../../api/PannelApis";
import {
  HostTourSearchOneApi,
  PriceCalculationApi,
  RequestToReserveApi,
  GetInfoReserveApi,
} from "../../api/toureApis";
import { AppContext, SignalRContext } from "../../App";
import { ConvertToShamsi } from "../../components/DateFunctions/DateFunctions";
import AskToLogin from "../../components/Login/AskToLogin/AskToLogin";
import StepperReserve from "../../components/Stepers/StepperReserve";
import SweetAlert from "../../components/SweetAlert/SweetAlert";
import CardInfoReserve from "./Components/CardInfoReserve";
import ShowInfoOfReserve from "./Components/ShowInfoOfReserve";

import WaitingToPay from "./Components/WaitingToPay";
import PaymentPopover from "../../components/PaymentPopover/PaymentPopover";
import MyAlertMui from "../../components/MyAlertMui/MyAlertMui";
import axios from "axios";
import API_URL from "../../config/apiConfig";
const baseUrl = API_URL;

const moment = require("moment");
require("moment-jalaali");

export const ReservationStayContext = createContext();

const ReservationStay = () => {
  const navigate = useNavigate();

  // stepName is preview or preorder
  const { stepName, code } = useParams();
  const appContext = useContext(AppContext);
  const [infoOfReserve, setInfoOfReserve] = useState({ state: 0 });
  const [infoOfStay, setInfoOfStay] = useState({});
  const [paramsValues, setParamsValues] = useState({
    count: 0,
    start: "",
    end: "",
  });
  const [inputeValue, setInputeValues] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [messages, setMessage] = useState([]);
  const [openPaymentPopover, setOpenPaymentPopover] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show: show || false,
      status: status || "error",
      message: message || "خطای نامشخص",
    });
  };

  SignalRContext.useSignalREffect("OrderAccept", (message) => {
    console.info(
      message,
      "SignalRContext message useSignalREffect",
      code,
      parseFloat(message?.orderNumber) === parseFloat(code)
    );
    // refresh api if guid was current guid of reserve
    if (parseFloat(message?.orderNumber) === parseFloat(code))  {
      console.info("refreshing ...", message?.orderNumber);
      handleGetInfoOfReserve(true); //true
    }

    setMessage([...messages, message]);
  });

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
    } else {
      // Call immediately
      handleGetInfoOfReserve();
    }
  }, [code, stepName]);

  const handleGetInfoOfStay = async () => {
    setInfoOfStay({});
    const resultGetTour = await HostTourSearchOneApi(code);
    var item = resultGetTour?.data;
    const mystay = {
      title: item?.title,
      address: item?.address,
      img: item?.hostImages[item?.hostImages?.length - 1],
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
    const myData = {
      stayId: params?.stayId,
      start: params?.start,
      end: params?.end,
      count: params?.count,
    };
    const result = await PriceCalculationApi(
      myData?.stayId,
      myData?.start,
      myData?.end,
      myData?.count
    );
    // if(!result?.issuccess){
    //   navigate("/404");
    // }

    const exitEdData = result?.data;
    const infoDataReserve = {
      price: exitEdData?.price,
      extraPersonPrice: exitEdData?.extraPersonPrice,
      totalDiscountPrice: exitEdData?.totalDiscountPrice,
      mainPrice: exitEdData?.mainPrice,
      state: 0,
    };
    setInfoOfReserve(infoDataReserve);
    setLoadingPrices(false);
    return exitEdData;
  };

  //  اطلاعات رزرو
  const handleGetInfoOfReserve = async (dontLoading = false) => {
    setLoadingPrices(!dontLoading);

    const result = await GetInfoReserveApi(code);
    var myData = result?.data;
    console.log(result, "result");
    if (!result?.issuccess) {
      navigate("/404");
    }

    // اطلاعات رزرو و قیمت
    const exitEdData = {
      price: myData?.facktorFirstPrice,
      extraPersonPrice: myData?.extraPersonPrice,
      totalDiscountPrice: myData?.facktorDiscount,
      mainPrice: myData?.facktorPrice,
      state: parseFloat(myData?.state) + 1,
      name: myData?.userFirstName,
      lastname: myData?.userLastName,
      sms: myData?.mobile,
      fullName: myData?.fullName,
      guid: myData?.guid,
      expired: myData?.expired,
    };
    console.log(
      exitEdData,
      "infoOfReserve handleGetInfoOfReserve",
      "result =>",
      myData
    );
    setInfoOfReserve(exitEdData);

    // اطلاعات اقامکتگاه
    const mystay = {
      title: myData?.hostTourTitle,
      address: myData?.hostTourCityTitle,
      img: {
        file: {
          url: myData?.image,
        },
      },
      minCount: myData?.hostTourMinCapacity,
      maxCount: myData?.hostTourMaxCapacity,
    };
    setInfoOfStay(mystay);

    // اطلاعات پارامتر

    const myparams = {
      stayId: code,
      start: ConvertToShamsi(myData?.start),
      end: ConvertToShamsi(myData?.end, 1),
      count: myData?.personCount,
    };
    setParamsValues(myparams);

    setLoadingPrices(false);
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
    const dataToSend = {
      hostTourId: paramsValues?.stayId,
      start: paramsValues?.start,
      end: paramsValues?.end,
      personCount: paramsValues?.count,
      fullName: inputeValue?.name + " " + inputeValue?.lastName,
      mobile: inputeValue?.sms,
    };
    const result = await RequestToReserveApi(dataToSend);
    console.log(result, "RequestToReserveApi");

    if (result?.data?.orderNumber > 0) {
      const url = `/book/preorder/${result?.data?.orderNumber}`;
      navigate(url);
    } else {
      SweetAlert(false, "رزرو اقامتگاه با خطا مواجه شد");
    }
  };

  // آپدیت مقدار جدید
  const handleUpdateInputeValue = (data) => {
    var newValue = { ...inputeValue, ...data };
    setInputeValues(newValue);
    // console.log(newValue, "newValue , ", data);
  };

  //
  const handleGoToPayLink = async () => {
    setOpenPaymentPopover(true);
    // try {
    //   const result = await GetLinkPayReserveApi(infoOfReserve?.guid);
    //   // console.log(result, "handleGoToPayLink");

    //   if (result?.data?.link) {
    //     // For external URLs, use window.location.href
    //     // window.location.href = result.data.link;
    //   } else {
    //     console.error("No payment link received");
    //     // Optionally show an error message to the user
    //     SweetAlert(false, "Payment link not available");
    //   }
    // } catch (error) {
    //   console.error("Error getting payment link:", error);
    //   SweetAlert(false, "Failed to get payment link");
    // }
  };

  const handleClosePopover = () => {
    setOpenPaymentPopover(false);
  };

  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${baseUrl}/HostTourOrder/Payment/${infoOfReserve?.guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("withdraw data", response?.data?.data);

      setTrackingCode(response?.data?.data?.trackingCode);

      if (response?.data?.data?.state === "Success") {
        handleClosePopover();
        handleMangeAlert(
          true,
          "success",
          "برداشت از کیف پول با موفقیت انجام شد"
        );
        const url = `/book/order/${response?.data?.data?.trackingCode}`;
        navigate(url);
      } else {
        await verifyPayment();
        // window.location.href = response?.data?.data?.link
        handleMangeAlert(true, "success", "انتقال به درگاه با موفقیت انجام شد");
        handleClosePopover();
        const url = `/book/order/${response?.data?.data?.trackingCode}`;
        navigate(url);
      }
    } catch (error) {
      console.error(
        "Error fetch balance:",
        error?.response?.data || error.message
      );
    }
  };

  const verifyPayment = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${baseUrl}/HostTourOrder/VerifyPayment/${code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.data?.state === "Success") {
        handleClosePopover();
        handleMangeAlert(
          true,
          "success",
          "برداشت از کیف پول با موفقیت انجام شد"
        );
        const url = `/book/order/${response?.data?.data?.trackingCode}`;
        navigate(url);
      } else {
        handleClosePopover();
        // window.location.href = response?.data?.data?.link
        handleMangeAlert(true, "success", "انتقال به درگاه با موفقیت انجام شد");
      }
    } catch (error) {
      console.error(
        "Error fetch balance:",
        error?.response?.data || error.message
      );
    }
  };
  return (
    <>
      {appContext?.isLoginMain ? (
        <ReservationStayContext.Provider
          value={{
            handleGetInfoOfReserve,
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
            handleGoToPayLink,
            handleMangeAlert,
            handleWithdraw,
            handleClosePopover,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              margin: "0 auto",
              padding: { xs: 2, md: 0 },
              pb: 10,
              mb: 5,
              minHeight: "100vh",
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
                    errorTab={
                      infoOfReserve?.state === 5 || infoOfReserve?.state === 6
                        ? true
                        : infoOfReserve?.expired
                    }
                    activeStep={(() => {
                      const s = infoOfReserve?.state ?? 0;
                      console.log("st", s, ":", infoOfReserve?.state);

                      if (s === 6) return 3; // delivered/cancelled mapping previously
                      if (s === 5) return 1; // map 4 to step 1 as requested
                      const base = s;
                      return Number(base) ? base : 0;
                    })()}
                    steps={[
                      "ثبت درخواست",
                      "تایید میزبان",
                      "پرداخت",
                      "تحویل کلید",
                    ]}
                  />
                  {stepName === "preorder" &&
                    [1, 2].includes(infoOfReserve?.state) &&
                    !infoOfReserve?.expired && (
                      <WaitingToPay
                        activeStep={infoOfReserve?.state}
                        guid={infoOfReserve?.guid}
                        expired={infoOfReserve?.expired}
                        trackingCode={trackingCode}
                      />
                    )}

                  {stepName === "order" && infoOfReserve?.state === 3 && (
                    <Box
                      sx={{
                        mt: {xs:.5 , md:2},
                        textAlign: "center",
                        position: "relative",
                        top:{xs: "2rem" , md:"3.5rem"},
                      }}
                    >
                      <Typography>
                        <Typography
                          variant="subtitle1"
                          color={"grey"}
                          sx={{ display: "inline-block" }}
                        >
                          کد پیگیری رزرو :
                        </Typography>
                        {code}
                      </Typography>
                    </Box>
                  )}

                  {infoOfReserve?.expired && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "red" }}>
                        رزرو اقامتگاه لغو شد
                      </Typography>
                    </Box>
                  )}

                  <ShowInfoOfReserve />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <PaymentPopover isOpen={openPaymentPopover} />

          {showAlertSetting?.show && (
            <MyAlertMui
              message={showAlertSetting?.message || ""}
              handleClose={() =>
                handleMangeAlert(
                  false,
                  showAlertSetting?.status,
                  showAlertSetting?.message
                )
              }
              status={showAlertSetting?.status}
            />
          )}
        </ReservationStayContext.Provider>
      ) : (
        <AskToLogin />
      )}
    </>
  );
};

export default ReservationStay;
