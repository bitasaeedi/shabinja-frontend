import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import MainSearchForm from "./MainSearchForm/MainSearchForm";
import SubSliderHeader from "./SubSliderHeader";

// سرچ دسکتاپ
const Section1 = () => {
  const texts = ["اقامتگاه‌ها", "کلبه‌ها", "ویلاها"]; // Dynamic texts
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Reset animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length); // Update text index
        setAnimate(true); // Trigger animation
      }, 100); // Small delay to reset animation
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box className="hero-wrapper p-0 m-0 w-100 ">
      <Box className="hero-box hero-bg">
        <Box
          className="hero-content "
          sx={{
            paddingBottom: "90px",
          }}
        >
          {/* Title */}
          <Box className="section-heading text-center mt-5">
            <Typography
              variant="h2"
              className="text-white"
              sx={{ fontSize: 40 }}
            >
              شگفت‌انگیزترین{" "}
              <span className={`dynamic-text ${animate ? "appear" : ""}`}>
                {texts[currentIndex]}
              </span>{" "}
              در انتظارته!
            </Typography>
          </Box>

          <Grid container justifyContent="center" className="mt-5">
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
            <SubSliderHeader />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Section1;
