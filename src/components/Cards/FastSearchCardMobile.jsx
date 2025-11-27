import { Button, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DownloadImageApi } from "../../api/DownloadImageApi";

export default function FastSearchCardMobile({ myData = {} }) {
  // console.log("myDatafastmobile", myData);
  return (
    <>
      <Grid
        item
        xs={3}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid blue",
        }}
      >
        <Link
          to={`${myData?.linkUrl}`}
          style={{ textDecoration: "none", display: "block", width: "70px" }}
        >
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: { xs: 70, md: 100 },
              height: { xs: 88, md: 100 },
              margin: "5px 0",
              backgroundColor: "transparent",
              boxShadow: "none",
              color: "#37474f",
              borderRadius: "10px",
              padding: "0",
              overflow: "hidden",
              bgcolor: myData?.colorCode,
              "&:hover": { backgroundColor: { md: "rgba(0, 0, 0, 0.05)" } },
            }}
          >
            {/* {myData.icon} */}
            <CardMedia
              component="img"
              sx={{
                height: {
                  width: "100%",
                  height: "60px",
                },
                bgcolor: "white",
                objectFit: "cover",
              }}
              // `${baseUrl}${myData?.image}`
              image={DownloadImageApi(myData?.imageMobile?.url)} // Use the randomly selected image
              alt={myData?.imageMobile?.imgAlt || myData.title || " fastSearch Mobile"}
              // onLoad={handleImageLoad}
              loading="lazy"
              // style={{ display: isImageLoaded ? "block" : "none" }}
            />

            <Typography
              variant="h6"
              sx={{
                color: "white",
                marginTop: "0rem",
                lineHeight: "2.3",
                fontSize: { xs: 14, md: 14 },
              }}
            >
              {myData.title}
            </Typography>
          </Button>
        </Link>
      </Grid>
    </>
  );
}
