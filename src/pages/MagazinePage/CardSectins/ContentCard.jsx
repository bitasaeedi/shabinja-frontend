import { Box, Typography } from "@mui/material";
import moment from "moment-jalaali";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContentCard({ index, item, isMobile }) {
  const navigate = useNavigate();
  const handleClick = (itemId) => {
    navigate(`/mag/${itemId}`);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
          borderRadius: 2,
          // overflow: "hidden",
          position: "relative",
          marginBottom: isMobile ? "7.5rem" : "5.5rem",
          cursor: "pointer",
        }}
        onClick={() => handleClick(item?.id)}
      >
        <Box
          component="img"
          src={require(`../../../assest/images/sidebar/${
            (index + 1) % 4
          }.webp`)}
          alt="post-img"
          sx={{
            borderRadius: 2,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* <Box
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "150px",
            height: {xs:"125px",sm:"90px",md:"130px"},
            bgcolor: "black",
          }}
        ></Box> */}
        {/* text */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-6rem", sm: "-6rem", md: "-3.7rem" },
            padding: ".6rem 1rem 0",
            bgcolor: "white",
            width: "95%",
          }}
        >
          {/* title */}
          <Typography
            variant="h6"
            sx={{
              fontSize: isMobile ? "1.15rem" : "unset",
            }}
          >
            {item.title}
          </Typography>

          {/* info */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: "1.4rem",
              fontSize: ".9rem",
              display: "-webkit-box",
              WebkitLineClamp: 2, // تعداد خطوط
              WebkitBoxOrient: "vertical", // عمودی کردن
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.desc}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: ".8rem 0 .7rem",
              alignItems: "end",
            }}
          >
            {/* tags */}
            <Box sx={{ display: "flex", gap: 0.4 }}>
              {item?.tags?.map((tag , index) => {
                return (
                  <Typography key={index}
                    sx={{
                      bgcolor: "#287dfa",
                      color: "#fff",
                      minWidth: "70px",
                      textAlign: "center",
                      padding: " .2rem .5rem ",
                      borderRadius: 10,
                      fontSize: 13,
                    }}
                  >
                    {tag?.myTagTitle}
                  </Typography>
                );
              })}
            </Box>

            {/* date */}
            <Typography variant="subtitle2" color="gray" sx={{ fontSize: 12 }}>
              {moment(item?.created).format("jYYYY/jMM/jDD") || "1403/12/5"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
