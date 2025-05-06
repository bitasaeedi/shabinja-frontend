import React, { useState } from "react";
import { Box, Fade, Grid, Slide, Typography } from "@mui/material";
import FormGetMobileNumber from "./Components/FormGetMobileNumber";
import FormGetCode from "./Components/FormGetCode";
import FormGetPass from "./Components/FormGetPass";

const LoginForm = ({ handleCallBack, manageForms }) => {
  const [mobileGettingSms, setMobileGettingSms] = useState("");
  // اجرا شدن در صورت ارسال موفق شماره موبایل حهت دریافت پیامک
  const handleGetResponseSendMobile = async (response) => {
    setMobileGettingSms(response?.data?.userName);

    // handleSetManageFormsSteps("stepPassword"); // نمایش فرم دریافت پسورد

    handleSetManageFormsSteps("stepCode"); // نمایش فرم دریافت کد
  };

  // نتیجه دریافت توکن بعد از ارسال کد چهار رقمی
  const handleGetResponseSendCode = (responseGetToke) => {
    handleSetManageFormsSteps("finish");
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
      </Grid>
    </div>
  );
};

export default LoginForm;
