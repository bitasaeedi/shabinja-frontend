import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

import { Link } from "react-router-dom";
import ImageOfCard from "./ImageOfCard";


const MagHomeCard = ({ myData = {} }) => {
  return (
    <Box className=" w-auto pb-0 mb-0">
      <Card
        sx={{
          width: { xs: 280, sm: 265, md: 300, lg: 310, xl: 330 },
          borderRadius: 3,
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          boxShadow: "none !important",
          overflow: "hidden",
          direction: "rtl",
          pb: 0,
          mb: 1,
          backgroundColor: "transparent",
          position: "relative",
          "@media (min-width:400px) and (max-width:460px)": {
            width: 320,
          },
          "@media (min-width:460px) and (max-width:520px)": {
            width: 330,
          },
        }}
        // className="border"
      >
        <ImageOfCard myData={myData} url={myData?.firstImage?.url} type={"mag"} />

        {/* Card Content */}
        <Link
          to={`/mag/${myData?.id}`}
          style={{
            textDecoration: "none",
            display: "block",
            width: "100%",
            color: "inherit",
          }}
          target="_blank"
        >
          <CardContent className=" px-0 py-2 my-">
            {/* Title */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="start"
              gap={1}
              className="px-2"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "14px", sm: "16px", md: "16px" },
                  overflow: "hidden",
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  direction: "ltr",
                  textAlign: "right",
                  WebkitLineClamp: 2,
                }}
              >
                {myData?.title}
              </Typography>
            </Box>

            {/* desc */}
            <Box
              display="flex"
              justifyContent="end"
              alignItems="start"
              className="px-2"
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontSize: { xs: "10px", sm: "11px", md: "13px" },
                  lineHeight: "1.4rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // تعداد خطوط
                  WebkitBoxOrient: "vertical", // عمودی کردن
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  direction: "ltr", // Set to RTL for Farsi text
                  textAlign: "left", // Align text properly for Farsi
                }}
              >
                {myData?.desc}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent:"end", gap: 0.4 , mt:.8 }}>
              {myData?.tags?.map((tag, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      bgcolor: "#287dfa",
                      color: "#fff",
                      minWidth: "70px",
                      textAlign: "center",
                      padding: " .2rem .5rem ",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    {tag?.myTagTitle}
                  </Typography>
                );
              })}
            </Box>
          </CardContent>
        </Link>
      </Card>
    </Box>
  );
};

export default MagHomeCard;
