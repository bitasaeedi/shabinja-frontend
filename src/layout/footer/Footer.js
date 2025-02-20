import React, { useContext } from "react";
import { Box } from "@mui/material";

import MobileFooter from "./MobileFooter/MobileFooter";
import DesctopFooter from "./DesctopFooter/DesctopFooter";
import { AppContext } from "../../App";

const Footer = () => {
  const appContext = useContext(AppContext);

  return (
    <Box>
      <MobileFooter />
      <Box sx={{ display: appContext?.showFooter ? "inherit" : "none" }}>
        <DesctopFooter />
      </Box>
    </Box>
  );
};

export default Footer;
