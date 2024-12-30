import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

const ImageSection = () => {
  return (
    <Box sx={{}}>
      {/* Title and Buttons */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            اجاره بوم گردی میرزا - واحد دوتخته قشم
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{ borderRadius: 2 }}
            >
              اشتراک‌گذاری
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              sx={{ borderRadius: 2 }}
            >
              افزودن به مورد علاقه‌ها
            </Button>
          </Box>
        </Box>

        <Box sx={{}}>
          {/* Subtitle and Discount */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            استان هرمزگان، قشم - 4.04 (232 نظر ثبت شده)
          </Typography>
        </Box>
      </Box>
      {/* Image Grid */}
      <Grid container spacing={2}>
        {/* Main Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "400px",
          }}
        >
          <Box
            component="img"
            src="https://via.placeholder.com/800x600?text=Main+Image"
            alt="Main"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Four-Image Grid */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "400px", // Ensure the height matches the main section
            display: { xs: "none", md: "inherit" },
          }}
        >
          <Grid
            container
            spacing={0}
            sx={{
              height: "100%", // Full height for the parent container
            }}
          >
            {[...Array(4)].map((_, index) => (
              <Grid
                item
                xs={6}
                key={index}
                sx={{
                  height: "50%", // Each grid item takes 50% of the parent's height
                  border: "1px solid #eeeeee",
                }}
              >
                <Box
                  component="img"
                  src="https://via.placeholder.com/800x600?text=Main+Image"
                  alt={`Image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensure images fill their boxes
                    borderRadius: 2,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageSection;
