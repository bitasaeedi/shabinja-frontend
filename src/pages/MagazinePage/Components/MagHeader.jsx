import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import ToolBarComponent from "../Components/ToolBarComponent";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/system";
import { Box ,useMediaQuery} from "@mui/material";
import { AppContext } from "../../../App";
import { useContext } from "react";


const MagHeader = ({  }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const appContext = useContext(AppContext);
  const location = useLocation();
  const [isSticky, setIsSticky] = React.useState(false); 
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsSticky(window.scrollY > window.innerHeight * 0.61);//.7
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname !== "/") {
      setIsSticky(true);
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

  function handleIsVisible (value) {
    setIsVisible(value)
  }

  return (
    <>
      <CssBaseline />

      {/* {!isMobile && <HeaderAds handleIsVisible={handleIsVisible} isVisible={isVisible} />} */}
      <AppBar
        sx={{
          backgroundColor: isSticky ? "white" : "transparent",
          color: theme.palette.text.primary,
          boxShadow:
            !isSticky || appContext?.settingHeader?.removeShadow ? "none" : "0px 4px 5px rgba(0, 0, 0, 0.1)",
          height: 65,
          // position: "fixed",
          // top: 0,
          // zIndex: 20000,
          // width: "100%",

        }}
        component="nav"
      >
        <ToolBarComponent isSticky={isSticky} isVisible={isVisible} />
      </AppBar>
    </>
  );
};

export default MagHeader;
