import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../../../config/apiConfig";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
const baseUrl = API_URL;
const Begust = () => {

  const [bannerInfo, setBannerInfo]=useState();
  const [bgImage,setBgImage]=useState();

  const getBannerInfos = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${baseUrl}/BanerData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("banner",response?.data);
      setBannerInfo(response?.data?.data);
      let bg = DownloadImageApi(response?.data?.data?.image?.url)
      setBgImage(bg)
    } catch (error) {
      console.log(error?.response);
      return error?.response;
    }
  };

  useEffect(()=>{
    getBannerInfos();
  },[])

  
  return (
    <Box
      sx={{
        py: { xs: 3, md: 10},
        px: { xs: 2, md: 4 },
        backgroundImage: bannerInfo?.image?.url
          ? `url(${bgImage})`
          : "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        mb: 0,
        textAlign: "center",
      }}
    >
      <Grid
        container
        sx={{ width: { xs: "100%", md: "80%" }, mx: "auto", mt: 2 }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            {bannerInfo?.title ||""}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              maxWidth: { xs: "100%", md: "75%" },
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.8,
              opacity: 0.9, // Softer contrast for readability
            }}
          >
           {bannerInfo?.text || ""}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            to={bannerInfo?.btnLink}
            variant="contained"
            sx={{
              background: bannerInfo?.btnColorCode,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #e65100, #bf360c)",
              },
            }}
          >
            {bannerInfo?.btnTitle || ""}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Begust;
