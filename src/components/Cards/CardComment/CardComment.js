import React from "react";
import { Card, Avatar, Typography, Box } from "@mui/material";

const CardComment = ({ centerItem }) => {
  const widthSize = 180;
  const widthSizeMobile = 150;
  const heightSize = 140;
  const heightSizeMobile = 140;
  return (
    <Box
      sx={{
        transition: "all 0.3s ease-in-out",
        position: "relative",
        display: "inline-block",
        width: { xs: widthSizeMobile, sm: widthSize },
        // height: 250,
        height: { xs: heightSizeMobile, sm: heightSize },
        transform: centerItem ? "scale(1.2) translateY(-10px)" : "scale(1)",
        mx: "auto",
        overflow: "visible",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "100%", // Adjust height to match the card
          backgroundColor: "primary.main", // Use primary theme color
          opacity: centerItem ? "1" : ".7",
          transform: "rotate(-13deg)", // Rotate 10 degrees to the left
          zIndex: 0, // Behind the card
          borderRadius: "15px",
          transition: "all 0.3s ease-in-out",
        }}
      />

      <Card
        sx={{
          position: "relative",
          height: { xs: heightSizeMobile, sm: heightSize },
          width: "100%",
          zIndex: 1,
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          opacity: centerItem ? "1" : ".85",
          overflow: "visible",
          px: 1,
          transition: "all 0.3s ease-in-out",
        }}
        className=" border border-muted"
      >
        {/* Avatar Section */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)", // Center avatar and place it above the card
            zIndex: 100,
          }}
        >
          <Avatar
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            sx={{
              width: { xs: 40, md: 50 },
              height: { xs: 40, md: 50 },
              border: "4px solid #fff", // Add border to make it blend with the card
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow for emphasis
            }}
          />
        </Box>

        {/* Name Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 1,
            mt: 5,
            fontSize: { xs: 14, md: 14 },
          }}
        >
          پدرام محمدی
        </Typography>

        {/* Comment Section */}
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            fontSize: { xs: 10, md: 11 },
            textAlign: "justify",
            // mt: 1,
            // fontWeight: "bold",
            display: "-webkit-box",
            WebkitLineClamp: { xs: 3, md: 3 }, // Limit to 3 lines (adjust as needed)
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          یکی از بهترین پشتیبانی‌ها رو در سایت شبینجا دریافت کرده‌ام یکی از
          بهترین پشتیبانی‌ها رو در سایت شبینجا دریافت کرده‌ام یکی از بهترین
          پشتیبانی‌ها رو در سایت شبینجا دریافت کرده‌ام یکی از بهترین پشتیبانی‌ها
          رو در سایت شبینجا دریافت کرده‌ام یکی از بهترین پشتیبانی‌ها رو در سایت
          شبینجا دریافت کرده‌ام یکی از بهترین پشتیبانی‌ها رو در سایت شبینجا
          دریافت کرده‌ام یکی از بهترین پشتیبانی‌ها رو در سایت شبینجا دریافت
          کرده‌ام
        </Typography>
      </Card>
    </Box>
  );
};

export default CardComment;
