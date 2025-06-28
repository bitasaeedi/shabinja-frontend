import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CardInfoReserve = () => {
  return (
    <Card
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        boxShadow: { xs: "none", md: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
        width: { xs: "100%", md: 380 },
        backgroundColor: "greay.200",
        // display: { xs: "none", md: "block" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            component="img"
            src="https://cdn.jabama.com/image/jabama-images/1479505/74d96e42-b2ff-4d0e-b6c5-aff3361d7f54.jpeg"
            alt="Apartment"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              objectFit: "cover",
              backgroundColor: "grey.200",
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            آپارتمان یک خوابه جکوزی دار شادمان ستارخان
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" display="flex" alignItems="center">
              <Box component="span" mr={0.5}>
                📍
              </Box>
              تهران
            </Box>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        جزئیات پرداخت
      </Typography>

      <Stack spacing={2} sx={{ color: "text.secondary", mb: 2 }}>
        {/* Price Item 1 */}
        <Grid container>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">1 شب</Typography>
              <Typography variant="body2" mx={1}>
                ×
              </Typography>
              <Typography variant="body2">272,222 تومان</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Typography variant="body2">272,000 تومان</Typography>
          </Grid>
        </Grid>

        {/* Price Item 2 */}
        <Grid container>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">1 شب</Typography>
              <Typography variant="body2" mx={1}>
                ×
              </Typography>
              <Typography variant="body2">272,222 تومان</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Typography variant="body2">272,000 تومان</Typography>
          </Grid>
        </Grid>

        {/* Service Fee */}
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">هزینه خدمات</Typography>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Typography variant="body2">100,000 تومان</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} mt={1}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            جمع مبلغ قابل پرداخت
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Typography variant="subtitle1" fontWeight="bold">
            1,000,000 تومان
          </Typography>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="dark"
            fullWidth
            sx={{
              color: "white",
              fontSize: 18,
              backgroundColor: "#212121", // Ensures dark background
              "&:hover": {
                opacity: 0.8,
                backgroundColor: "#212121", // Maintain dark background on hover
              },
              "&:active": {
                transform: "scale(0.98)",
                backgroundColor: "#212121", // Maintain dark background when clicked
              },
              "&.Mui-disabled": {
                backgroundColor: "#424242", // Slightly lighter dark color when disabled
                color: "rgba(255, 255, 255, 0.5)", // Semi-transparent white text
                cursor: "not-allowed", // Show not-allowed cursor
              },
            }}
          >
            ثبت درخواست رزرو
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardInfoReserve;
