import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import CardSectins from "./CardSectins/CardSectins";
import HeaderMag from "./Components/HeaderMag";
import CardsPart from "./Components/CardsPart";
import MainPart from "./Components/MainPart";

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
          bgcolor: "#f9f9f9",
          border:"1px solid #f9f9f9"
        }}
      >

        {/* slider */}
        <HeaderMag/>

        {/* sidebar , ... */}
        <MainPart/>

      </Box>
    </>
  );
};

export default MagazinePage;
