import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import axios from "axios";
import API_URL from "../../../config/apiConfig";
const baseUrl = API_URL;



const PointsBeforStart = () => {
  const [texts, setTexts] = useState();

  const fetchBanner = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/PageGuide/List/HostTour`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("text", response?.data?.data);

      setTexts(response?.data?.data);
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <Container sx={{ mt: { xs: 0, md: 0}, mb: 6 }}>
      <Box
        sx={{
          // backgroundColor: "rgba(40, 125, 250, 0.1)",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <Container sx={{ py: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: 25, md: 30 } }}
          >
            {texts?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 0 }}>
            {texts?.desc}
          </Typography>
        </Container>
      </Box>

      {texts?.sections?.map((section, idx) => (
        <Box
          key={idx}
          sx={{
            backgroundColor: idx % 2 === 0 ? "rgba(40, 125, 250, 0.1)" : "none",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)", // Ensures the background spans the full width
          }}
        >
          <Container sx={{ py: 6 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {`${idx + 1}- ${section.title}`}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ maxWidth: "600px", margin: "0 auto" }}
              >
                {section.desc}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {section?.items?.map((step, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0px 4px 20px rgba(40, 125, 250, 0.2)",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 6px 25px rgba(40, 125, 250, 0.3)",
                      },
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        height: "100%",
                      }}
                    >
                      {/* <Box
                        sx={{
                          fontSize: "2rem",
                          backgroundColor: "#eef7ff",
                          color: "#287dfa",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        {step.icon}
                      </Box> */}

                      <Avatar
                        sx={{
                          fontSize: "2rem",
                          backgroundColor: "#eef7ff",
                          color: "#287dfa",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          mb: 2,
                        }}
                      >
                        {(() => {
                          const rawName = step?.itemIcon || "";
                          const normalizedName = rawName.replace(/Icon$/, "");
                          const IconComponent = MuiIcons[normalizedName] || QuestionMarkIcon;
                          console.log(normalizedName);
                          
                          return React.createElement(IconComponent, { fontSize: "inherit" });
                        })()}
                      </Avatar>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        fontSize="1.1rem"
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        textAlign="center"
                      >
                        {step.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      ))}

      <Box
        textAlign="center"
        sx={{
          position: "sticky",
          bottom: { xs: 95, md: 40 },
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to={texts?.buttonLink}
          sx={{
            backgroundColor: "#287dfa",
            color: "#fff",
            width: 300,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#1e63c8",
            },
          }}
        >
          {texts?.buttonTitle}
        </Button>
      </Box>
    </Container>
  );
};

export default PointsBeforStart;
