import React, { memo, useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { DownloadImageApi } from "../../api/DownloadImageApi";
import ToRial from "../ToRial/ToRial";
import { Link } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarIcon from "@mui/icons-material/Star";
const MarkerPopUp = ({
  draggableLimit,
  point,
  toggleDraggable,
  position,
  draggable,
}) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const url = point?.images[0];
    console.log(url);
    setImgUrl(url);
  }, [point]);
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
    <Link
      to={`/stay/${point?.id}`}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
      target="_blank"
    >
      <Box
        sx={{
          minWidth: "320px",
          maxWidth: "340px",
          // minHeight: "100%",
          height: 110,
        }}
        className="p-0 m-0 borde"
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
              width: 110,
              // height: 105,
              borderRadius: "3px 3px 3px 3px",
              objectFit: "cover",
            }}
            className="borde"
            image={DownloadImageApi(imgUrl)} // Replace with your image URL
            alt={point?.title}
          />
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "start",
            }}
            className="borde p-1 m-0 px-2"
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{ fontSize: 14, my: 0, py: 0 }}
            >
              <StarIcon
                sx={{
                  color: "#FFD700",
                  // fontSize: 20
                  fontSize: 14,
                }}
                className="mb-1 "
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 14,
                  my: 0,
                  py: 0,
                }}
                className="px-1"
                component="span"
              >
                {point?.rate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  my: 0,
                  py: 0,
                }}
                component="span"
              >
                ({point?.countRate} نظر)
              </Typography>
            </Box>
            <Typography
              component="span"
              variant="h6"
              sx={{
                fontSize: { xs: 14, md: 16 },
              }}
            >
              {point?.title}
            </Typography>
            <Box>
              <Typography
                // variant="subtitle2"
                color="text.secondary"
                component="span"
                sx={{
                  fontSize: { xs: 10, md: 12 },
                }}
              >
                شروع قیمت :
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontSize: { xs: 12, md: 15 },
                  mx: "1px",
                }}
              >
                {ToRial(point?.minPrice)}
              </Typography>
              <Typography
                // variant="subtitle2"
                color="text.secondary"
                component="span"
                sx={{
                  fontSize: { xs: 10, md: 12 },
                }}
              >
                تومان / هر شب
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
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
