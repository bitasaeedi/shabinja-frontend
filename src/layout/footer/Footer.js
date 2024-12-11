import React from "react";
import { Box } from "@mui/material";

import MobileFooter from "./MobileFooter/MobileFooter";
import DesctopFooter from "./DesctopFooter/DesctopFooter";

const Footer = () => {
  //   const isMobile = useMediaQuery('(max-width:600px)');

  //   if (!isMobile) return null; // Ensure it only shows on mobile

  return (
    <Box>
      <MobileFooter />
      <DesctopFooter />
    </Box>
  );
};

export default Footer;
