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
import { DownloadImageApi } from "../../../api/DownloadImageApi";
const baseUrl = API_URL;

const DesctopFooter = () => {
  
  const [footerLinks, setFooterLinks] = useState();
  const [contactData, setContactData] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null);

  const fetchContactData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/ContactData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sorted = response?.data?.data?.sort((a, b) => a.id - b.id);
      setContactData(sorted);
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  const fetchSocialMedia = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${baseUrl}/SocialNetwork/List`,
        {
          take: 10,
          skip: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sorted = response?.data?.data?.sort((a, b) => a.order - b.order);
      console.log("social media", sorted);
      setSocialMedia(sorted);
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

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
      setFooterLinks(response?.data?.data);
      console.log("links", response?.data?.data);

      return true;
    } catch (error) {
      console.log(error?.response);

      return false;
    }
  };

  useEffect(() => {
    handleLinks();
    fetchContactData();
    fetchSocialMedia();
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        py: { md: 6 },
        borderTop: "1px solid #ddd",
        zIndex: "100 !important",
        paddingTop: "1.2rem",
        position: "relative", // برای موقعیت‌دهی بهتر
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Quick Links Section */}

        <Grid container spacing={2}>
          <Box
            sx={{
              paddingLeft: "35px",
              display: "flex",
              gap: 0,
              justifyContent: { xs: "space-around", md: "flex-end" },
              width: { xs: "100%", md: "55%" },
              height: "100%",
              pt: 2,
            }}
          >
            {footerLinks?.map((link, index) => {
              return (
                <Grid item xs={4} md={4}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      // color: "#0d47a1",
                      textAlign: { xs: "start", md: "start" },
                    }}
                  >
                    {link.category}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "space-between",
                        md: "space-around",
                      },
                    }}
                  >
                    <Stack
                      spacing={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {link.list?.map((list) => {
                        return (
                          <Link to={list.urlTour} className="react-router-link">
                            <Typography sx={{}}>{list.title}</Typography>
                          </Link>
                        );
                      })}
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Box>

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
              {socialMedia?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item?.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      margin: "0 4px",
                    }}
                  >
                    <Box
                      component="img"
                      src={DownloadImageApi(item?.image?.url)}
                      alt={item?.title || "Social Media"}
                      sx={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box
          mt={1}
          pt={3}
          // borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 3, md: 0 } }}
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
                  {contactData ? contactData[1]?.title : ""} :{" "}
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
                  {contactData ? contactData[1]?.value : ""}
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
                  {contactData ? contactData[3]?.title : ""} :{" "}
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
                  {contactData ? contactData[3]?.value : ""}
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
                  {contactData ? contactData[5]?.title : ""} :{" "}
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
                  {contactData ? contactData[5]?.value : ""}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          mt={{ xs: 0, md: 1 }}
          pt={{ xs: 0, md: 3 }}
          borderTop="1px solid #ddd"
          textAlign="center"
          color="textSecondary"
          sx={{ pb: { xs: 2, md: 0 } }}
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
