import React, { useEffect, useState } from "react";
import { Box, Fade, Grid, Slide, Typography } from "@mui/material";
import FormGetMobileNumber from "./Components/FormGetMobileNumber";
import FormGetCode from "./Components/FormGetCode";
import FormGetPass from "./Components/FormGetPass";
import { ApiCheckAndSms } from "../../api/LoginApis";
import FormGetNameUser from "./Components/FormGetNameUser";
const starttimer = 120;
const LoginForm = ({ handleCallBack, manageForms }) => {
  const [mobileGettingSms, setMobileGettingSms] = useState("");
  const [countdown, setCountdown] = useState(starttimer);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  // Start countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true); // Enable the "Resend Code" button when countdown reaches zero
    }
  }, [countdown]);

  // ارسال محدد کد پیامکی
  const handleResendCode = async () => {
    setIsResendEnabled(false); // Disable the "Resend Code" button again
    var resultCheckSms = await ApiCheckAndSms({
      UserName: mobileGettingSms,
    });
    console.log(resultCheckSms, "handleResendCode", mobileGettingSms);
    setCountdown(starttimer); // Reset the countdown timer
  };

  // اجرا شدن در صورت ارسال موفق شماره موبایل حهت دریافت پیامک
  const handleGetResponseSendMobile = async (response) => {
    setMobileGettingSms(response?.data?.userName);

     handleSetManageFormsSteps("stepPassword"); // نمایش فرم دریافت پسورد

   // handleSetManageFormsSteps("stepCode"); // نمایش فرم دریافت کد
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

  return (
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
            <FormGetMobileNumber callBack={handleGetResponseSendMobile} />
          )}
        </div>
        {/* </Slide> */}

        <Slide direction="left" in={manageForms === "stepCode"} timeout={500}>
          <div>
            {manageForms === "stepCode" && (
              <FormGetCode
                callBack={handleGetResponseSendCode}
                mobileGettingSms={mobileGettingSms}
                handleSetManageFormsSteps={handleSetManageFormsSteps}
                handleResendCode={handleResendCode}
                countdown={countdown}
                isResendEnabled={isResendEnabled}
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
                callBack={handleGetResponseSendCode}
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
  );
};

export default LoginForm;
