// Footer.js
import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Home,
  AccountCircle,
  Chat,
  Favorite,
  ShoppingBag,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import MobileFooter from "./MobileFooter/MobileFooter";

const Footer = () => {
  //   const isMobile = useMediaQuery('(max-width:600px)');

  //   if (!isMobile) return null; // Ensure it only shows on mobile

  return (
    <Box>
      <MobileFooter />
    </Box>
  );
};

export default Footer;
