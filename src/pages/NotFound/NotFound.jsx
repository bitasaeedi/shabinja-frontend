import React from "react";
import errorImg from "./Lost in Travel Scenery 404.png";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>صفحه پیدا نشد | شبینجا</title>
        <meta
          name="description"
          content="صفحه‌ای که به دنبال آن بودید در شبینجا یافت نشد. برای ادامه به صفحه اصلی بازگردید."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "#FAFAF9",
          height: "100vh",
          pt: { xs: 16, md: 8 },
        }}
      >
        {/* img */}
        <Box
          component="img"
          src={errorImg}
          alt="404"
          sx={{
            width: { xs: "310px", md: "550px" },
            // height:"500px"
          }}
        />
        {/* text */}
        <Typography variant="h5">صحفه مورد نظر یافت نشد</Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
            navigate("/");
          }}
        >
          بازگشت به صحفه اصلی
        </Button>
      </Box>
    </>
  );
}
