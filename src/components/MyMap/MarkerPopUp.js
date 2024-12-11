import React, { memo, useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
const MarkerPopUp = ({
  draggableLimit,
  point,
  toggleDraggable,
  position,
  draggable,
}) => {
  //   // مسیریابی
  const handleMarkerClick = () => {
    const destination = position;
    const userAgent = navigator.userAgent.toLowerCase();
    // console.log(destination, "destination");
    let webURL;
    if (userAgent.includes("android")) {
      // URL for Android devices
      webURL = `geo:${destination?.lat || destination[0]},${
        destination?.lng || destination[1]
      }`;
    } else if (
      userAgent.includes("iphone") ||
      userAgent.includes("ipad") ||
      userAgent.includes("ipod")
    ) {
      // URL for iOS devices
      webURL = `maps://maps.apple.com/?daddr=${
        destination?.lat || destination[0]
      },${destination?.lng || destination[1]}`;
    } else {
      // URL for other platforms (fallback to web-based Google Maps)
      webURL = `https://www.google.com/maps/dir/?api=1&destination=${
        destination?.lat || destination[0]
      },${destination?.lng || destination[1]}`;
    }

    window.open(webURL, "_blank");
  };

  return (
    <Box
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        minHeight: 100,
        height: 100,
      }}
      className="p-0 m-0"
    >
      <Card
        className="p-0 m-0"
        sx={{
          display: "flex",
          height: "100%",
          boxShadow: "none",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: "100%",
          }}
          image="https://via.placeholder.com/100" // Replace with your image URL
          alt="Image description"
        />
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <Typography component="div" variant="h6">
            عنوان اقامتگاه {point?.id}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            توضیحات بیشتر
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(MarkerPopUp);

{
  /* <Button
title="مسیریابی "
variant="contained"
size="small"
onClick={handleMarkerClick}
>
مسیریابی

</Button> */
}
