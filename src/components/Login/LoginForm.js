import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, Fade, Grid, Slide, Typography } from "@mui/material";
import FormGetMobileNumber from "./Components/FormGetMobileNumber";
import FormGetCode from "./Components/FormGetCode";
import FormGetPass from "./Components/FormGetPass";
import { ApiCheckAndSms } from "../../api/LoginApis";
import FormGetNameUser from "./Components/FormGetNameUser";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import { AppContext } from "../../App";
const baseUrl = API_URL;
const starttimer = 120;
export const LoginFormContext = createContext(null);
const LoginForm = ({ handleCallBack, manageForms }) => {
  const {handleSetTimerCountDown,countdown ,codeIsSend,handleSetCodeIsSend , handleSetIsResendEnabled,isResendEnabled}=useContext(AppContext)
  const [mobileGettingSms, setMobileGettingSms] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [numberExist, setNumberExist] = useState(false);

  const handleSetCountDown = (value) => {
    handleSetIsResendEnabled(false)
    handleSetTimerCountDown(value);
  };

  // useEffect(() => {
  //   if (codeIsSend) {
  //     if (countdown > 0) {
  //       const timer = setInterval(() => handleSetTimerCountDown((prev) => prev - 1), 1000);
  //       return () => clearInterval(timer);
  //     } else {
  //       setIsResendEnabled(true);
  //     }
  //   }
  // }, [countdown, codeIsSend]);

  function getPhoneNumber(number) {
    setPhoneNumber(number);
  }
  // ارسال محدد کد پیامکی
  const handleResendCode = async () => {
    handleSetIsResendEnabled(false);
    var resultCheckSms = await ApiCheckAndSms({
      UserName: mobileGettingSms,
    });
    console.log(resultCheckSms, "handleResendCode", mobileGettingSms);
    handleSetTimerCountDown(starttimer);
  };

  // اجرا شدن در صورت ارسال موفق شماره موبایل حهت دریافت پیامک
  const handleGetResponseSendMobile = async (response, step) => {
    setMobileGettingSms(response?.data?.userName);
    handleSetManageFormsSteps(step); // نمایش فرم دریافت کد
  };

  // نتیجه دریافت توکن بعد از ارسال کد چهار رقمی
  const handleGetResponseSendCode = (responseGetToke) => {
    if (responseGetToke?.data?.firstname || responseGetToke?.data?.lastname) {
      handleSetManageFormsSteps("finish");
    } else {
      handleSetManageFormsSteps("getInfoUser");
    }
  };

  const handleSetManageFormsSteps = (stepName) => {
    handleCallBack(stepName);
  };

  const checkMobileNumber = async (phone) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${baseUrl}/user/exist/${phone}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("my number", response?.data);
      let step =
        response?.data?.issuccess === true ? "stepPassword" : "stepCode";
      setNumberExist(response?.data?.issuccess);
      return step; // Return the step value
    } catch (error) {
      // handleMangeAlert(true, "error", "مشکلی در سرور پیش آمده");
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  return (
    <LoginFormContext.Provider
      value={{
        phoneNumber,
        numberExist,
        checkMobileNumber,
        codeIsSend,
        handleSetCodeIsSend,
        handleSetCountDown,
      }}
    >
      <div>
        <Grid
          container
          justifyContent="center"
          sx={{
            px: {
              xs: 5,
              md: 1,
            },
          }}
        >
          {/* <Slide direction="left" in={manageForms === "stepMobile"} timeout={500}> */}
          <div>
            {manageForms === "stepMobile" && (
              <FormGetMobileNumber
                callBack={handleGetResponseSendMobile}
                getPhoneNumber={getPhoneNumber}
              /> // if code was send this will be true
            )}
          </div>
          {/* </Slide> */}

          <Slide direction="left" in={manageForms === "stepCode"} timeout={500}>
            <div>
              {manageForms === "stepCode" && (
                <FormGetCode
                  callBack={handleGetResponseSendCode}
                  mobileGettingSms={mobileGettingSms}
                  handleSetManageFormsSteps={handleSetManageFormsSteps} //change step
                  handleResendCode={handleResendCode}
                  countdown={countdown}
                  isResendEnabled={isResendEnabled}
                  phoneNumber={phoneNumber}
                />
              )}
            </div>
          </Slide>

          <Slide
            direction="left"
            in={manageForms === "stepPassword"}
            timeout={500}
          >
            <div>
              {manageForms === "stepPassword" && (
                <FormGetPass
                  callBack={handleGetResponseSendMobile}
                  mobileGettingSms={mobileGettingSms}
                  handleSetManageFormsSteps={handleSetManageFormsSteps}
                />
              )}
            </div>
          </Slide>

          <Slide
            direction="left"
            in={manageForms === "getInfoUser"}
            timeout={500}
          >
            <div>
              {manageForms === "getInfoUser" && (
                <FormGetNameUser
                  mobileGettingSms={mobileGettingSms}
                  handleSetManageFormsSteps={handleSetManageFormsSteps}
                />
              )}
            </div>
          </Slide>
        </Grid>
      </div>
    </LoginFormContext.Provider>
  );
};

export default LoginForm;
