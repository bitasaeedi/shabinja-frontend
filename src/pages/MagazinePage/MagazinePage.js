import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import CardSectins from "./CardSectins/CardSectins";
import HeaderMag from "./Components/HeaderMag";
import CardsPart from "./Components/CardsPart";
import MainPart from "./Components/MainPart";
import SwiperMag from "./Components/SwiperMag";
import { useParams } from "react-router-dom";
import MagHeader from "./Components/MagHeader";

const MagazinePage = () => {
  const { id } = useParams();

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
      <MagHeader />
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          border: "1px solid #f9f9f9",
        }}
      >
        {/* slider */}
        {!id ? <HeaderMag /> : null}

        {/* title */}
        {!id ? (
          <Typography
            variant="h5"
            sx={{
              color: "white",
              textAlign: "center",
              py: 1.5,
              m: "2rem 3rem 2rem",
              borderRadius: 1.5,
              bgcolor: "black",
              fontSize: "23px",
            }}
          >
            مجله شبینجا
          </Typography>
        ) : (
          ""
        )}

        {/*small swiper */}
        {/* <SwiperMag /> */}

        {/* sidebar , ... */}
        <MainPart />
      </Box>
    </>
  );
};

export default MagazinePage;
