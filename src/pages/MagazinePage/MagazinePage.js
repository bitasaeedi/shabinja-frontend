import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import CardSectins from "./CardSectins/CardSectins";
import HeaderMag from "./Components/HeaderMag";
import HeroSlider from "./Components/HeroSlider";

const MagazinePage = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
      showHeader: false,
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight:'80vh',
          bgcolor: "#f9f9f9",
        }}
      >

        {/* slider */}
        <HeaderMag/>

      </Box>
    </>
  );
};

export default MagazinePage;
