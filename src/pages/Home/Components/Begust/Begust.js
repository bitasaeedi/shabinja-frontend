import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Begust = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: 4,
        background: "linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)",
        mb: 5,
      }}
    >
      <Grid container sx={{ width: { xs: "100%", md: "80%" }, mx: "auto" }}>
        <Grid item xs={12} md={9}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#388E3C", // Dark green color for the title
              mb: 2,
            }}
          >
            رایگان میزبان شو!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#2C6B38", // Slightly darker green for the description
              mb: 3,
              maxWidth: { xs: "100%", md: "80%" },
              lineHeight: 1.6, // More readable description
              textAlign: "justify",
              fontSize: { xs: 16, md: 18 },
            }}
          >
            به راحتی به عنوان میزبان ثبت‌نام کنید و کسب و کار خود را به سطح بعدی
            برسانید. با استفاده از خدمات ما می‌توانید فرصت‌های جدیدی برای رشد
            پیدا کنید، به جمع بزرگ میزبانان بپیوندید و تجربه‌ای متفاوت از مدیریت
            داشته باشید. همین حالا ثبت‌نام کنید و شروع کنید!
          </Typography>
        </Grid>
        <Grid
          item
          //   className="border"
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6"></Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#388E3C", // Button color matching the title
              color: "white",
              textTransform: "none",
              mb: 2,
              "&:hover": {
                backgroundColor: "#2C6B38",
              },
            }}
          >
            بیشتر بدانید
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Begust;
