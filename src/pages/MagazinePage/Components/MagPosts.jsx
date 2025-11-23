import { Box, Typography, Button, Card } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import moment from "moment-jalaali";

export default function MagPosts({ isMobile }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState();

  const getBlog = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${API_URL}/Mag/Get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response?.data?.data, "get Selected Blogs");
      setBlog(response?.data?.data);
    } catch (error) {
      console.log(error, "getSelectedBlog Error");
      return error?.response?.data;
    }
  }, []);

  function HtmlContent({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: isMobile ? "100%" : "90%",
          margin: "2rem auto",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            py: "2rem",
          }}
        >
          {/* title */}
          <Box
            sx={{
              color: "white",
              textAlign: "center",
              py: 1.5,
              px: isMobile ? 1 : 2,
              m: isMobile ? ".8rem auto 1.5rem" : "1.5rem auto 2rem",
              borderRadius: 1.5,
              bgcolor: "black",
              display: "flex",
              gap: 1.5,
              justifyContent: "space-between",
              alignItems: "center",
              width: isMobile ? "96%" : "78%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
                fontSize: isMobile ? ".8rem" : "unset",
              }}
            >
              <Box>نام نویسنده : {blog?.author} </Box>
              <Box
                sx={{
                  color: "#aaaaaa",
                  fontSize: isMobile ? ".7rem" : ".8rem",
                }}
              >
                {moment(blog?.modified ? blog?.modified : blog?.created).format(
                  "jYYYY/jMM/jDD"
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: isMobile ? 0.5 : 1,
                alignItems: "center",
              }}
            >
              <Typography color="white" fontSize=".75rem">
                زمان مطالعه : {blog?.studyTime}
              </Typography>

              {blog?.tags?.map((tag, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      bgcolor: "#287dfa",
                      borderRadius: 13,
                      padding: ".22rem .5rem",
                      minWidth: isMobile ? "65px" : "100px",
                      textAlign: "center",
                      fontSize: isMobile ? 10 : 14,
                    }}
                  >
                    {tag?.myTagTitle}
                  </Typography>
                );
              })}
            </Box>
          </Box>
          <HtmlContent htmlString={decodeHtml(blog?.mainText)} />
        </Card>
      </Box>
    </>
  );
}
