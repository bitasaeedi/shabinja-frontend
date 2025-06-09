import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import CardSectins from "./CardSectins/CardSectins";
import HeaderMag from "./Components/HeaderMag";

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
    <Box
      sx={{
        bgcolor: "#f9f9f9",
      }}
    >
      <h1>مجله شبینجا</h1>
      <HeaderMag />
      <CardSectins
        data={[
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 4 },
        ]}
      />
    </Box>
  );
};

export default MagazinePage;
