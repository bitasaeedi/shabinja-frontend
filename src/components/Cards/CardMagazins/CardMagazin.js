import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Skeleton,
  Avatar,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { Link } from "react-router-dom";
import ImageOfCardMag from "./ImageOfCardMag";
const CardMagazin = ({ myData = {}, isMapOpen }) => {
  // List of image URLs
  // State to manage image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    // console.log(myData, "myData");
  }, []);

  return (
    <Box className=" w-auto pb-0 mb-0">
      <Card
        sx={{
          width: {
            xs: 320,
            sm: 360,
            md: 360,
            lg: isMapOpen ? 330 : 340,
            xl: isMapOpen ? 350 : 370,
          },
          borderRadius: 3,
          mx: "1px",
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.9)",
          boxShadow: "none !important",
          overflow: "hidden",
          direction: "rtl",
          pb: 0,
          mb: 1,
          backgroundColor: "white",
        }}
        // className="border"
      >
        <Link
          // to={`/stay/${myData?.id}`}
          style={{ textDecoration: "none", display: "block", width: "100%" }}
          // target="_blank"
        >
          <ImageOfCardMag />

          <CardContent className=" px-0 py-2 my-">
            {/* Title */}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="start"
              gap={1}
              className="px-2 mt-3"
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "black",
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  overflow: "hidden",
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  direction: "rtl", // Set to RTL for Farsi text
                  textAlign: "right", // Align text properly for Farsi
                }}
              >
                سوغات خوزستان از طعم خرما تا پنیر نخل
              </Typography>
            </Box>

            {/* نویسنده */}
            <Box
              display="flex"
              justifyContent="end"
              alignItems="start"
              className=" px-0 mt-4"
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontSize: { xs: "12px", sm: "13px", md: "13px" },
                  overflow: "hidden",
                  maxWidth: "100%",

                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  direction: "ltr", // Set to RTL for Farsi text
                  textAlign: "right", // Align text properly for Farsi
                }}
              >
                پریسا سجادی
                <Typography
                  variant="span"
                  className="mx-1"
                  // component={"span"}
                >
                  <CalendarMonthOutlinedIcon
                    color="action"
                    sx={{
                      fontSize: { xs: "12px", sm: "14px", md: "16px" },
                      ml: 2,
                      mr: 1,
                    }}
                  />
                  20 اسفند 1403
                </Typography>
              </Typography>
              <Avatar
                sx={{
                  width: 15,
                  height: 15,
                  background: "linear-gradient(135deg, #287dfa, #6a11cb)",
                  color: "white",
                  ml: 2,
                  mr: 1,
                }}
                // src={
                //   appContext?.userInfo?.imageUrl
                //     ? DownloadImageApi(appContext?.userInfo?.imageUrl)
                //     : ""
                // }
              ></Avatar>
            </Box>
          </CardContent>
        </Link>
      </Card>
    </Box>
  );
};

export default CardMagazin;
