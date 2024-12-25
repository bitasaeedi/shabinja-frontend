import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";
import logo_with_name from "../../../images/shabinja_logo_with_name.png";
const DesctopFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        py: 6,
        borderTop: "1px solid #ddd",
        zIndex: "100 !important",
        position: "relative", // برای موقعیت‌دهی بهتر
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Quick Links Section */}

        <Grid container spacing={2}>
          {/* About Us */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ display: "flex" }}
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
              mt={1}
            >
              {/* Logo Section */}
              <Link to="/">
                <Box
                  className="mx-0 px-0"
                  component="img"
                  src={logo_with_name}
                  alt="Shabinja Logo"
                  sx={{
                    maxWidth: { xs: 100, md: 140 }, // Controls the max width of the image
                    width: "auto", // Ensures the width scales proportionally
                    height: "auto", // Keeps the height proportional to the width
                    objectFit: "contain", // Makes sure the image fits inside the container without distortion
                    cursor: "pointer",
                  }}
                />
              </Link>
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#0d47a1" }}
              >
                ما را در شبکه‌های اجتماعی دنبال کنید
              </Typography>
              <Box>
                <IconButton
                  to="/"
                  sx={{ color: "#d32f2f" }}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  to="/"
                  sx={{ color: "#03a9f4" }}
                  aria-label="Telegram"
                >
                  <TelegramIcon />
                </IconButton>
                <IconButton to="/" sx={{ color: "black" }} aria-label="X">
                  {/* //1da1f2 */}
                  <XIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* FAQ Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#0d47a1",
                textAlign: { xs: "start", md: "center" },
              }}
            >
              دسترسی سریع
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "space-around" },
              }}
            >
              <Stack spacing={1}>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>شیوه‌های پرداخت امن</Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>سوالات متداول مسافران</Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>تماس با پشتیبانی</Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>قوانین و مقررات</Typography>
                </Link>
              </Stack>
              <Stack spacing={1} sx={{}}>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>صفحه اصلی</Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>رزرو اقامتگاه</Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>تماس با ما</Typography>
                </Link>

                <Link to="/" className="react-router-link">
                  <Typography sx={{}}>مجله شبینجا</Typography>
                </Link>
              </Stack>
            </Box>
          </Grid>
          {/* Licenses Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#0d47a1",
                textAlign: { xs: "start", md: "center" },
              }}
            >
              مجوزها و نمادها
            </Typography>
            <Box display="flex" gap={2}>
              <Box
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                  p: 2,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  مجوز کشوری
                </Typography>
                <Typography variant="caption">کسب و کار مجازی</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fce4ec",
                  borderRadius: 1,
                  p: 2,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  نماد اعتماد
                </Typography>
                <Typography variant="caption">الکترونیکی</Typography>
              </Box>
            </Box>

            {/* sxv n,l  */}
            <Box display="flex" mt={1} gap={2}>
              <Box
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: 1,
                  p: 2,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  مجوز کشوری
                </Typography>
                <Typography variant="caption">کسب و کار مجازی</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#fce4ec",
                  borderRadius: 1,
                  p: 2,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  نماد اعتماد
                </Typography>
                <Typography variant="caption">الکترونیکی</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          mt={6}
          pt={3}
          borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 5, md: 0 } }}
        >
          <Grid container>
            <Grid xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                تیم شبینجا به صورت ۲۴ ساعته آماده پاسخگویی به سوالات شما است.
              </Typography>
            </Grid>
            <Grid xs={12} md={4} className="d-flex justify-content-around">
              <Typography variant="body2">
                شماره پشتیبانی:{" "}
                <strong dir="ltr" className="mx-1">
                  021-12345678
                </strong>
              </Typography>
              <Typography variant="body2">
                فکس :{" "}
                <strong dir="ltr" className="mx-1">
                  021-12345678
                </strong>
              </Typography>
            </Grid>
            <Grid xs={12} md={4} sx={{}}>
              <Typography
                variant="body2"
                sx={{ textAlign: { sx: "start", md: "center" } }}
              >
                ایمیل :{" "}
                <strong className="mx-1" dir="ltr">
                  support@shabinja.com
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          mt={1}
          pt={3}
          borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 5, md: 0 } }}
        >
          <Typography
            variant="caption"
            display="block"
            mt={2}
            sx={{ color: "#666" }}
          >
            © ۲۰۲۴ شبینجا. کلیه حقوق محفوظ است.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DesctopFooter;
