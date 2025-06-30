import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import StepperReserve from "../../../../../../components/Stepers/StepperReserve";

const CardStays = ({ stay }) => {
  const handleDelete = () => {};

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: { xs: "none", md: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
        backgroundColor: "greay",
        borderBottom: { xs: "solid thin gray", md: "none" },
        my: 2,
        // border: "solid thin gray"
      }}
    >
      <Grid container>
        <Grid item xs="12" md="9">
          <Grid container spacing={2}>
            <Grid
              item
              xs={"auto"}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                component="img"
                src="https://cdn.jabama.com/image/jabama-images/1479505/74d96e42-b2ff-4d0e-b6c5-aff3361d7f54.jpeg"
                alt="Apartment"
                sx={{
                  width: 180,
                  height: 120,
                  // height: "auto",
                  borderRadius: 1,
                  objectFit: "cover",
                  backgroundColor: "grey.200",
                }}
              />
            </Grid>
            <Grid item sx={{}}>
              <Box>
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
              </Box>
              <Box
                sx={{
                  mt: 1,
                  display: "flex ",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 13 }}
                  >
                    تعداد مهمان
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    // color="text.secondary"
                    fontWeight={"bold"}
                    sx={{ fontSize: 14 }}
                  >
                    2 نفر
                  </Typography>
                </Box>

                <Box sx={{ borderLeft: "solid 1px gray", pl: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 13 }}
                  >
                    تاریخ اقامت
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    // color="text.secondary"
                    fontWeight={"bold"}
                    sx={{ fontSize: 14 }}
                  >
                    12 تا 16 تیر
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* stepper */}
          <Grid container>
            <Grid item xs="12" sx={{ mt: 2 }}>
              <StepperReserve
                errorTab={true}
                activeStep={2}
                steps={["ثبت درخواست", "تایید میزبان", "پرداخت", "تحویل کلید"]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          sx={{ borderLeft: { xs: "none", md: "solid thin gray" }, pl: 2 }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            {/* میزبان */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 12 }}
              >
                میزبان
              </Typography>
              <Typography
                variant="subtitle1"
                // color="text.secondary"
                fontWeight={"bold"}
                sx={{ fontSize: 16 }}
              >
                یاسر زروندی
              </Typography>
            </Box>

            {/* پرداخت */}
            <Box sx={{ width: "100%", mt: { xs: 3, md: 0 } }}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 12 }}
                >
                  مبلغ کل:
                </Typography>
                <Typography
                  variant="subtitle1"
                  // color="text.secondary"
                  fontWeight={"bold"}
                  sx={{ fontSize: 20 }}
                >
                  480000
                </Typography>
              </Box>

              {/* کلید */}
              <Button
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
                پرداخت
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardStays;
