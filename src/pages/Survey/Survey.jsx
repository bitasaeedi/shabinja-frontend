import { Box, Button, Divider, Paper, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import { useParams } from "react-router-dom";

export default function Survey() {
  const [surveyList, setSurveyList] = useState([]);
  const [ratings, setRatings] = useState({});
  const { code } = useParams();

  const handleRatingChange = (guid, value) => {
    setRatings((prev) => ({ ...prev, [guid]: value }));
  };

  //send rating
  const handleSubmit = async () => {

    const result = Object.entries(ratings).map(([id, rate]) => ({
      PollQuestionId: Number(id),
      Answer: rate,
      HostTourOrderId: code || 1, //code url
    }));

    console.log("نتیجه نهایی برای ارسال:", result);

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(`${API_URL}/PollAnswer`, result, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data?.data, "response?.data?.data");
    } catch (error) {
      console.log(error, "DeleteRequestReserveApi");
      return error?.response?.data;
    }

  };

  //  get list
  const getSurveyList = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${API_URL}/PollQuestion/GetAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data?.data, "response?.data?.data");
      setSurveyList(response?.data?.data);
    } catch (error) {
      console.log(error, "DeleteRequestReserveApi");
      return error?.response?.data;
    }
  };

  useEffect(() => {
    getSurveyList();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: 300, md: 800 },
            mx: "auto",
            mt: { xs: 5, md: 14 },
          }}
        >
          {surveyList.map((category, catIndex) => (
            <Paper key={catIndex} elevation={3} sx={{ mb: 4, p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: 16, md: 18 } }}
              >
                {category.title}
              </Typography>

              <Divider sx={{ mb: { xs: 1.5, md: 2 } }} />

              {category.questions.length === 0 ? (
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: 14, md: 16 } }}
                >
                  سؤالی در این دسته وجود ندارد.
                </Typography>
              ) : (
                category.questions.map((question, qIndex) => {
                  const isLast = qIndex === category.questions.length - 1;

                  return (
                    <Box
                      key={question.id}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: isLast ? "none" : "1px dashed #ddd",
                      }}
                    >
                      <Typography
                        sx={{
                          width: { xs: "100%", md: "70%" },
                          fontSize: { xs: 14, md: 16 },
                          mb: { xs: 1, md: 0 },
                        }}
                      >
                        {question.title}
                      </Typography>

                      <Rating
                        name={`rating-${question.id}`}
                        value={ratings[question.id] || 0}
                        onChange={(event, newValue) =>
                          handleRatingChange(question.id, newValue)
                        }
                        sx={{
                          fontSize: { xs: 20, md: 24 },
                        }}
                      />
                    </Box>
                  );
                })
              )}
            </Paper>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            size="large"
            sx={{ mt: 2, margin: "1rem auto", display: "block" }}
          >
            ثبت نظرات
          </Button>
        </Box>
      </Box>
    </>
  );
}
