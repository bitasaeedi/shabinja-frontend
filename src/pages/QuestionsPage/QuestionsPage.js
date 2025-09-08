import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppContext } from "../../App";
import axios from "axios";
import API_URL from "../../config/apiConfig";
const baseUrl = API_URL;

const QuestionsPage = () => {
  const appContext = useContext(AppContext);
  const [questions, setQuestions] = useState();

  const getQuestion = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/Faq`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response?.data?.data);
      // console.log("fq", response?.data?.data);
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4, mt: { xs: 0, md: 9 } }}>
      <Box sx={{ py: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#2c3e50",
            display: "flex",
            justifyContent: "center",
            mb: 7,
          }}
        >
          <Typography variant="inherit" sx={{}}>
            سوالات متداول
          </Typography>
          {/* <Typography
            variant="inherit"
            sx={{
              color: "primary.main",
              // px: 1,
            }}
          >
            شبینجا{" "}
          </Typography> */}
        </Typography>

        {questions?.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 0,
              boxShadow: "none",
              border: "none",
              "&:before": { display: "none" },
              borderBottom: "1px solid #ddd",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 2 }}>
              <Typography variant="h6" sx={{ fontSize: { xs: 14, md: 18 } }}>
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ my: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  textAlign: "justify",
                }}
              >
                {item.faqAnswer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default QuestionsPage;
