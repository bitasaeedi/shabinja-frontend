import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { MagPageContext } from "../MagazinePage";
import { DownloadImageApi } from "../../../api/DownloadImageApi";

const ShowImageHeader = ({ index , slide, isMobile }) => {

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "16 / 9" : "16 / 6", // نسبت ابعاد (مثلاً ویدیو یا بنر)
          borderRadius: isMobile ? 0 : 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={DownloadImageApi(isMobile ? slide?.secondImage?.url : slide?.firstImage?.url)}
          alt={isMobile ? slide?.secondImage?.imgAlt : slide?.firstImage?.imgAlt ||`Slide ${index + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            // maxHeight: { xs: 200, sm: 250, md: 300, lg: 500 },
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          width: isMobile ? "38%" : "40%",
          position: "absolute",
          bottom: isMobile ? 10 : 16,
          left: isMobile ? 10 : 16,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          px: isMobile ? 1 : 2,
          py: 1,
          borderRadius: 1,
          fontSize: { xs: "14px", md: "18px" },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "15px", md: "22px" },
            textAlign: "justify",
            mb:{xs:.4 , md:.7}
          }}
        >
          {slide?.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "13px", md: "18px" },
            textAlign: "justify",
            display: "-webkit-box",
            WebkitLineClamp: 3, // تعداد خطوط
            WebkitBoxOrient: "vertical", // عمودی کردن
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {slide?.desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowImageHeader;
