import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { AppContext } from "../../App";
import CircleIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import AboutImage from "./AboutUsImage/aboutUs.jpg";
import { DownloadImageApi } from "../../api/DownloadImageApi";
const baseUrl = API_URL;
const AboutUs = () => {
  const appContext = useContext(AppContext);

  const [aboutData, setAboutData] = useState([]);
  const [firstText, setFirstText] = useState([]);
  const [image, setImage] = useState([]);
  const [secondText, setSecondText] = useState([]);

  function structuredArray(value) {
    return value
      ?.split(/(?=[*-])/g) // جدا کردن قبل از هر * یا -
      .map((item) => item.trim()) // حذف فاصله‌های اضافه
      .filter((item) => item) // حذف موارد خالی
      .map((item) => {
        if (item.startsWith("*")) {
          return { type: "title", content: item.replace(/^\*/, "").trim() };
        } else if (item.startsWith("-")) {
          return { type: "text", content: item.replace(/^-/, "").trim() };
        } else {
          return null;
        }
      })
      .filter(Boolean);
  }

  function showText(value) {
    return (
      <Box>
        {value?.map((item, index) => {
          if (item.type === "title") {
            return (
              <Typography
                variant="h3"
                key={index}
                sx={{
                  textAlign:{xs: "center" , md:"left"},
                  fontWeight: 600,
                  fontSize: { xs: 20, md: 26 },
                  my: 1.5,
                }}
              >
                {" "}
                {renderContent(item.content)}{" "}
              </Typography>
            );
          } else if (item.type === "text") {
            return (
              <Typography
                variant="body1"
                key={index}
                sx={{
                  px: { xs: ".8rem", md: 0 },
                  lineHeight: 1.8,
                  textAlign: "justify",
                  fontSize: {xs:".9rem" , md:"1rem"},
                }}
              >
                {" "}
                {renderContent(item.content)}{" "}
              </Typography>
            );
          } else {
            return null;
          }
        })}{" "}
      </Box>
    );
  }

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/AboutData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const first = response?.data?.data?.find(
        (item) => item.key === "AboutDataText"
      )?.value;
      const myImage = response?.data?.data?.find(
        (item) => item.key === "AboutDataImage"
      )?.image?.url;
      const second = response?.data?.data?.find(
        (item) => item.key === "AboutDataTwo"
      )?.value;

      setFirstText(structuredArray(first));
      setImage(myImage);
      setSecondText(structuredArray(second));

      console.log(structuredArray(first), "response.data");
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  function renderContent(text) {
    if (typeof text !== "string") return text; // اگه رشته نبود همون رو برگردون
    return text.split(/\s+/).map((word, i) => {
      if (word.startsWith("+")) {
        return (
          <span key={i} style={{ color: "#287dfa", fontWeight: "bold" }}>
            {word.replace(/^\+/, "")}
          </span>
        );
      }
      return word + " ";
    });
  }

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
    fetchAboutData();
  }, []);

  // decode html

  return (
    <Container
      // maxWidth="1000px"
      sx={{ py: { xs: 1, md: 2 }, minHeight: "100vh", maxWidth: "950px" }}
    >
      <Box
        sx={{ py: { xs: 0, md: 0 }, borderRadius: 2, pb: { xs: 12, md: 12 } }}
      >
        {/* درباره شبینجا */}
        {/* <Typography
          variant="h4"
          // align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#2c3e50",
            display: "flex",
            justifyContent: "center",
            // mt: 3,
            mb: 5,
          }}
        >
          <Typography variant="inherit" sx={{ mr: 0.5 }}>
            درباره
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              color: "primary.main",
            }}
          >
            شبینجا{" "}
          </Typography>
        </Typography> */}

        {/* img */}
        <Box
          sx={{
            margin: "0 auto",
            my: 6,
            width: { xs: "100%", md: "90%" },
          }}
        >
          <Box
            component="img"
            src={DownloadImageApi(image)}
            sx={{ width: "100%", borderRadius: "10px" }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "75%" }, margin: "0 auto" }}>
          {showText(firstText)}

          {showText(secondText)}
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
