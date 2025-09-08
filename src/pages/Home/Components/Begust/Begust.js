import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../../../config/apiConfig";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
import { useTheme } from "@emotion/react";
const baseUrl = API_URL;

const truncateText = (text, maxLength ) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const EachBanner = ({ bannerInfo, bgImage, loan, isMobile }) => {
  const title = loan ? bannerInfo?.titleTwo : bannerInfo?.title;
  const text = loan ? bannerInfo?.textTwo : bannerInfo?.text;
  const btnLink = loan ? bannerInfo?.btnLinkTwo : bannerInfo?.btnLink;
  const btnTitle = loan ? bannerInfo?.btnTitleTwo : bannerInfo?.btnTitle;
  const btnColorCode = loan
    ? bannerInfo?.btnColorCodeTwo
    : bannerInfo?.btnColorCode;

  return (
    <Box
      sx={{
        width: { xs: "98%", md: "48%" },
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      {/* عکس بنر */}
      <Box
        component="img"
        src={bgImage}
        alt={title}
        sx={{
          width: "100%",
          height: { xs: 180, md: 300 },
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* کادر متن زیر عکس */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: { xs: 0, md:0 },
          height: {xs:"95px" , md :"88px"},
          maxHeight: "90px",
        }}
      >
        <Box sx={{ padding: "1rem", width: "80%" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: { xs: 0.6, md: 1 },
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              textAlign: "left",
              color: "text.primary",
            }}
          >
            {title || ""}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 0,
              fontSize: { xs: "0.95rem", md: "1rem", textAlign: "left" },
              color: "text.secondary",
              lineHeight: { xs: 1.3, md: 1 },
            }}
          >
            {truncateText(text, isMobile ? 70 : 87)}
          </Typography>
        </Box>

        <Button
          component={Link}
          to={btnLink}
          variant="contained"
          sx={{
            width: "18%",
            minWidth: "120px",
            background: btnColorCode,
            px: 1,
            py: 1.2,
            borderRadius: 0,
            fontSize: "1.05rem",
            fontWeight: "bold",
            transition: "0.3s",
            "&:hover": {
              background: "linear-gradient(45deg, #e65100, #bf360c)",
            },
          }}
        >
          {btnTitle || ""}
        </Button>
      </Box>
    </Box>
  );
};

const Begust = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [bannerInfo, setBannerInfo] = useState();
  const [bgImageLoan, setBgImageLoan] = useState();
  const [bgImageHost, setBgImageHost] = useState();

  const getBannerInfos = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/BanerData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("banner", response?.data);
      setBannerInfo(response?.data?.data);
      let bgLoan = DownloadImageApi(response?.data?.data?.imageTwo?.url);
      setBgImageLoan(bgLoan);
      let bgHost = DownloadImageApi(response?.data?.data?.image?.url);
      setBgImageHost(bgHost);
    } catch (error) {
      console.log(error?.response);
      return error?.response;
    }
  };

  useEffect(() => {
    getBannerInfos();
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 3, md: 2 },
        px: { xs: 2, md: 4 },
        mb: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 0 },
        }}
      >
        <EachBanner
          bannerInfo={bannerInfo}
          bgImage={bgImageHost}
          loan={false}
          isMobile={isMobile}
        />

        <EachBanner
          bannerInfo={bannerInfo}
          bgImage={bgImageLoan}
          loan={true}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
};

export default Begust;
