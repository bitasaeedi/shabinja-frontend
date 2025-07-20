import { Button, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DownloadImageApi } from "../../api/DownloadImageApi";

export default function FastSearchCardMobile({ myData = {} }) {
  console.log("myDatafastmobile", myData);
  return (
    <>
      <Grid
        item
        xs={3}
       
      >
        <Link
          to={`${myData?.linkUrl}`}
          style={{ textDecoration: "none", display: "block", width: "100%" }}
        >
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              minWidth: { xs: 70, md: 100 },
              height: { xs: 90, md: 100 },
              margin: "5px",
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
              // alt={myData?.title}
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
