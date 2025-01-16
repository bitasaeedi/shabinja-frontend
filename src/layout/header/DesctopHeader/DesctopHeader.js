import * as React from "react";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";

import ToolBarComponent from "./ToolBarComponent/ToolBarComponent";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/system";
import { Box } from "@mui/material";

const DesctopHeader = ({ shadow }) => {
  const location = useLocation();
  const theme = useTheme();
  const [isSticky, setIsSticky] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      // Set sticky when scrolled beyond 50% of the viewport height
      if (location.pathname === "/") {
        setIsSticky(window.scrollY > window.innerHeight * 0.7);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setIsSticky(true); // Always set sticky to true when path is not "/"
    } else {
      // Optionally handle sticky behavior when on "/" path
      setIsSticky(window.scrollY > window.innerHeight * 0.5); // Adjust sticky based on scroll position
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setIsSticky(true);
    } else {
    }
  }, [location.pathname]);

  return (
    <>
      <CssBaseline />

      <AppBar
        sx={{
          backgroundColor: isSticky ? "white" : "transparent",
          color: theme.palette.text.primary,
          boxShadow:
            !isSticky || !shadow ? "none" : "0px 4px 5px rgba(0, 0, 0, 0.1)",
          height: 65,
          // position: "fixed",
          // top: 0,
          // zIndex: 20000,
          // width: "100%",
        }}
        component="nav"
      >
        <ToolBarComponent isSticky={isSticky} />
      </AppBar>
    </>
  );
};

export default DesctopHeader;
