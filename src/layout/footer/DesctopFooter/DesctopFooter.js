import React, { useEffect, useState } from "react";
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
import logo_with_name_white from "../../../images/shabinja_logo_with_name_white.png";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
const baseUrl = API_URL;

const DesctopFooter = () => {
  const [footerLinks, setFooterLinks] = useState();

  const handleLinks = async (data) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("my data", data);

      const response = await axios.get(
        `${baseUrl}/QuickLinkShbinja/GetAll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFooterLinks(response?.data?.data)
      console.log("links",response?.data?.data);
      
      return true;
    } catch (error) {
      console.log(error?.response);

      return false;
    }
  };

  useEffect(()=>{
    handleLinks();
  },[])

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        py: {xs: 0,md: 6},
        borderTop: "1px solid #ddd",
        zIndex: "100 !important",
        position: "relative", // برای موقعیت‌دهی بهتر
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Quick Links Section */}

        <Grid container spacing={2}>
          {footerLinks?.map((link,index)=>{
            return <Grid item xs={6} md={2}>

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                // color: "#0d47a1",
                textAlign: { xs: "start", md: "center" },
              }}
            >
              {link.category}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "space-around" },
              }}
            >
    
              <Stack spacing={1}>

              {link.list?.map((list)=>{
                return  <Link to={list.urlTour} className="react-router-link">
                <Typography sx={{}}>{list.title}</Typography>
              </Link>
              })}

              </Stack>
            </Box>

          </Grid>
          })}
         
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                // color: "#0d47a1",
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
                  <Typography sx={{ textAlign: "center" }}>
                    شیوه‌های پرداخت امن
                  </Typography>
                </Link>
                <Link to="/help" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    سوالات متداول مسافران
                  </Typography>
                </Link>

                <Link to="/rules" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    قوانین و مقررات
                  </Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    رزرو اقامتگاه
                  </Typography>
                </Link>
              </Stack>
              <Stack spacing={1} sx={{ textAlign: "center" }}>
                <Link to="/" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    صفحه اصلی
                  </Typography>
                </Link>
                <Link to="/" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    مجله شبینجا
                  </Typography>
                </Link>
                <Link to="/about" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    درباره ما
                  </Typography>
                </Link>
                <Link to="/contact" className="react-router-link">
                  <Typography sx={{ textAlign: "center" }}>
                    تماس با ما
                  </Typography>
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
                // color: "#0d47a1",
                textAlign: { xs: "start", md: "center" },
              }}
            >
              به ما اعتماد کنید
            </Typography>
            <Box display="flex" gap={2} sx={{ height: 115 }}>
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
            </Box>
          </Grid>
        </Grid>

        {/* لوگو و شبکه ها */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            alignItems: "center",
            backgroundColor: "#0d47a1",
            p: 2,
            borderRadius: 3,
            mx: 0,
            flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, row on medium and larger screens
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: { xs: 2, md: 0 }, // Add margin bottom on small screens, remove on medium and larger screens
            }}
          >
            <Link to="/">
              <Box
                component="img"
                src={logo_with_name_white}
                alt="Shabinja Logo"
                sx={{
                  maxWidth: { xs: 100, md: 120 },
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, row on medium and larger screens
              textAlign: { xs: "center", md: "left" }, // Center text on small screens, left align on medium and larger screens
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#fff",
                mt: 1,
                mr: { xs: 0, md: 2 }, // Remove margin right on small screens, add on medium and larger screens
                mb: { xs: 2, md: 0 }, // Add margin bottom on small screens, remove on medium and larger screens
              }}
            >
              ما را در شبکه‌های اجتماعی دنبال کنید
            </Typography>
            <Box>
              <IconButton
                to="/"
                sx={{ color: "#d32f2f", backgroundColor: "#fff" }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                to="/"
                sx={{ color: "#03a9f4", backgroundColor: "#fff", mx: 1 }}
                aria-label="Telegram"
              >
                <TelegramIcon />
              </IconButton>
              <IconButton
                to="/"
                sx={{ color: "black", backgroundColor: "#fff" }}
                aria-label="X"
              >
                <XIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          mt={1}
          pt={3}
          // borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 5, md: 0 } }}
        >
          <Grid container>
            {/* تلفن */}
            <Grid item xs={12} md={4} sx={{}}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    // color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                  }}
                >
                  تلفن پشتیبانی :{" "}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                    ml: 1,
                  }}
                >
                  021-12345678
                </Typography>
              </Box>
            </Grid>

            {/* ایمیل */}
            <Grid item xs={12} md={4} sx={{}}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    // color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                  }}
                >
                  ایمیل:
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                    ml: 1,
                  }}
                >
                  support@shabinja.com
                </Typography>
              </Box>
            </Grid>
            {/* کد پستی */}
            <Grid item xs={12} md={4} sx={{}}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    // color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                  }}
                >
                  کدپستی :{" "}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: "#0d47a1",
                    textAlign: { xs: "start", md: "center" },
                    fontSize: 16,
                    ml: 1,
                  }}
                >
                  021-12345678
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          mt={{xs: 0,md: 1}}
          pt={{xs: 0,md: 3}}
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
            © تمامی حقوق مادی و معنوی این سایت متعلق به شرکت توسعه تجارت استوار
            زاگرس می‌باشد
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DesctopFooter;
