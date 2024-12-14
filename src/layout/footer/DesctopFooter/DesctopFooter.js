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
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Quick Links Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          {/* Logo Section */}
          <Link to="/">
            <Box
              className="mx-0 px-0"
              component="img"
              src={logo_with_name}
              alt="Shabinja Logo"
              sx={{
                maxWidth: 120, // Controls the max width of the image
                width: "auto", // Ensures the width scales proportionally
                height: "auto", // Keeps the height proportional to the width
                objectFit: "contain", // Makes sure the image fits inside the container without distortion
                cursor: "pointer",
              }}
            />
          </Link>
        </Box>

        {/* Top Section */}
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              درباره ما
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              شبینجا همراه شما در تمام لحظات سفر است. هدف ما ایجاد تجربه‌ای
              به‌یادماندنی برای مسافران و میزبانان است. با ما سفر را ساده‌تر،
              امن‌تر و لذت‌بخش‌تر تجربه کنید.
            </Typography>
          </Grid>

          {/* FAQ Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              سوالات متداول
            </Typography>
            <Stack spacing={1}>
              <Link to="/" className="react-router-link">
                چگونه اقامتگاه خود را ثبت کنیم؟
              </Link>
              <Link to="/" className="react-router-link">
                شیوه‌های پرداخت امن
              </Link>
              <Link to="/" className="react-router-link">
                قوانین لغو رزرو چیست؟
              </Link>
              <Link to="/" className="react-router-link">
                سوالات متداول مسافران
              </Link>
              <Link to="/" className="react-router-link">
                تماس با پشتیبانی
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            {/* Quick Links Section */}
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#0d47a1" }}
              >
                دسترسی سریع
              </Typography>
              <Stack spacing={1} sx={{}}>
                <Link to="/" className="react-router-link">
                  صفحه اصلی
                </Link>
                <Link to="/" className="react-router-link">
                  رزرو اقامتگاه
                </Link>
                <Link to="/" className="react-router-link">
                  تماس با ما
                </Link>
                <Link to="/" className="react-router-link">
                  قوانین و مقررات
                </Link>
                <Link to="/" className="react-router-link">
                  مجله شبینجا
                </Link>
              </Stack>
            </Box>
          </Grid>
          {/* Licenses Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
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
          </Grid>
        </Grid>

        {/* Social Media and Contact */}
        <Box textAlign="center" mt={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#0d47a1" }}
          >
            ما را در شبکه‌های اجتماعی دنبال کنید
          </Typography>
          <Box>
            <IconButton to="/" sx={{ color: "#d32f2f" }} aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton to="/" sx={{ color: "#03a9f4" }} aria-label="Telegram">
              <TelegramIcon />
            </IconButton>
            <IconButton to="/" sx={{ color: "black" }} aria-label="X">
              {/* //1da1f2 */}
              <XIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box
          mt={6}
          pt={3}
          borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 5, md: 0 } }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            تیم شبینجا به صورت ۲۴ ساعته آماده پاسخگویی به سوالات شما است.
          </Typography>
          <Typography variant="body2">
            شماره پشتیبانی: <strong dir="ltr">021-12345678</strong>
            <br /> ایمیل: <strong dir="ltr">support@shabinja.com</strong>
          </Typography>
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
