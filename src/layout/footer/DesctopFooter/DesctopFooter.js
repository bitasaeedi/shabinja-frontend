import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

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
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#0d47a1" }}
            >
              سوالات متداول
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit">
                چگونه اقامتگاه خود را ثبت کنیم؟
              </Link>
              <Link href="#" underline="hover" color="inherit">
                شیوه‌های پرداخت امن
              </Link>
              <Link href="#" underline="hover" color="inherit">
                قوانین لغو رزرو چیست؟
              </Link>
              <Link href="#" underline="hover" color="inherit">
                سوالات متداول مسافران
              </Link>
              <Link href="#" underline="hover" color="inherit">
                تماس با پشتیبانی
              </Link>
            </Stack>
          </Grid>

          {/* Licenses Section */}
          <Grid item xs={12} md={4}>
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
            <IconButton
              href="#"
              sx={{ color: "#d32f2f" }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="#"
              sx={{ color: "#03a9f4" }}
              aria-label="Telegram"
            >
              <TelegramIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: "#1da1f2" }} aria-label="Twitter">
              <TwitterIcon />
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
            شماره پشتیبانی: <strong>021-12345678</strong> | ایمیل:{" "}
            <strong>support@shabinja.com</strong>
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
