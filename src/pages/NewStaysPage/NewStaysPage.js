import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../../layout/header/Header";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import ManageSteps from "./ManageSteps";
import PointsBeforStart from "./PointsBeforStart/PointsBeforStart";
import AskToLogin from "../../components/Login/AskToLogin/AskToLogin";
import { AppContext } from "../../App";

const NewStaysPage = () => {
  const appContext = useContext(AppContext);
  const { step } = useParams();
  const [wichComponent, setWichComponent] = useState("start"); // start , wizard , (codeStay => like => 123456)
  useEffect(() => {
    setWichComponent(step);
  }, [step]);
  useEffect(() => {
    // Show footer only for the "start" step, hide for wizard and stay code steps
    if (wichComponent === "start") {
      appContext.setShowfooter(appContext?.isLoginMain ? true :false);
    } else {
      appContext.setShowfooter(false);
    }
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
    });
  }, [wichComponent]);

  return (
    <>
      {/* Header */}
      {/* <Header showMobileHeader={false} /> */}
      {appContext?.isLoginMain ? (
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            margin: "0 auto",
            padding: wichComponent !== "start" ? { xs: 1, md: 2 } : "0",
            mb: wichComponent !== "start" ? { xs: 20, md: 10 } : "0",
          }}
          // className="shadow"
        >
          <Box sx={{ height: { xs: 0, md: 80 } }}></Box>
          {wichComponent === "start" ? (
            <PointsBeforStart />
          ) : wichComponent === "wizard" ? (
            <ManageSteps />
          ) : wichComponent ? (
            <ManageSteps stayCodeToComplete={wichComponent} />
          ) : (
            <PointsBeforStart />
          )}
        </Box>
      ) : (
        <AskToLogin />
      )}
    </>
  );
};

export default NewStaysPage;
