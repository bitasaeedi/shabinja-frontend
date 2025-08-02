import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import MainSearchForm from "./MainSearchForm/MainSearchForm";
import SubSliderHeader from "./SubSliderHeader";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
const baseUrl = API_URL;

// سرچ دسکتاپ
const Section1 = ({ listCategories = [] }) => {
 
  const [slider, setSlider] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/SliderHost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data, "sliderList response");
      setSlider(response?.data[0]);
    } catch (error) {
      console.log("show comments Error:", error?.response?.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="hero-wrapper p-0 m-0 w-100 ">
      <Box className="hero-box hero-bg"
        sx={{
          backgroundImage: DownloadImageApi(slider?.image?.url),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          className="hero-content "
          sx={{
            paddingBottom: "90px",
          }}
        >
          {/* Title */}

          <Grid container justifyContent="center" className="mt-4 mb-4">
            <Grid item xs={11} sm={8}>
              <Grid
                container
                spacing={0}
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                <Grid item xs={12} className="">
                  <MainSearchForm />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              position: "absolute",
              bottom: "-60px", // Pull the box down 50px below the bottom of the hero
              left: "50%",
              transform: "translateX(-50%)", // Center horizontally
              width: "80%", // Adjust as needed
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Optional shadow
              // padding: "16px",
              borderRadius: "8px",
              height: "100px", // Adjusted height for larger buttons
            }}
          >
            <SubSliderHeader listCategories={listCategories} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Section1;
