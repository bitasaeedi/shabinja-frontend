import React, { useContext, useEffect, useState, useCallback } from "react";
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
import { groupFaqByCategory } from "../../utils/faqUtils";
import { Helmet } from "react-helmet-async";

const baseUrl = API_URL;

const QuestionsPage = () => {
  const appContext = useContext(AppContext);
  const [groupedQuestions, setGroupedQuestions] = useState({});

  const getQuestion = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/Faq`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const questionsData = response?.data?.data;
      setGroupedQuestions(groupFaqByCategory(questionsData));
      console.log("fq", questionsData);
      console.log("grouped questions", groupFaqByCategory(questionsData));
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  }, []);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
  }, [appContext]);

  return (
    <>
      <Helmet>
        <title>سؤالات متداول | شبینجا</title>
        <meta
          name="description"
          content="پاسخ به متداول‌ترین سؤالات کاربران درباره نحوه رزرو، پرداخت، لغو رزرو و شرایط اقامت در شبینجا."
        />
        <meta
          name="keywords"
          content="سؤالات متداول, راهنما, رزرو اقامت, شبینجا"
        />
      </Helmet>
      
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

          {Object.keys(groupedQuestions).map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 4.5 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 1,
                  fontSize: { xs: 18, md: 22 },
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                {category}
              </Typography>

              {groupedQuestions[category]?.map((item, index) => (
                <Accordion
                  key={`${category}-${index}`}
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
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ py: 1 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: 14, md: 17 },
                        maxWidth: { xs: "300px", md: "unset" },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ my: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: 14, md: 15 },
                        textAlign: "justify",
                      }}
                    >
                      {item.faqAnswer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default QuestionsPage;
