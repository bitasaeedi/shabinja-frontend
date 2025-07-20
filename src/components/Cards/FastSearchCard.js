import { Typography, Button, Grid, CardMedia } from "@mui/material"; // Use MUI Button
import React from "react";
import { Link } from "react-router-dom";
import { DownloadImageApi } from "../../api/DownloadImageApi";
const FastSearchCard = ({ myData = {} }) => {
  return (
    <Grid item>
      <Link
        to={`${myData?.linkUrl}`}
        style={{ textDecoration: "none", display: "block", width: "100%" }}
      >
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: { xs: 80, md: 100 },
            height: { xs: 80, md: 100 },
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "#37474f",

            "&:hover": { backgroundColor: { md: "rgba(0, 0, 0, 0.05)" } },
          }}
        >
          {/* {myData.icon} */}
          <CardMedia
            component="img"
            sx={{
              height: {
                width: 50,
                height: 50,
              },
              
              objectFit: "cover",
              borderRadius: "0px 0px 10px 10px",
            }}
            // `${baseUrl}${myData?.image}`
            image={DownloadImageApi(myData?.image?.url)} // Use the randomly selected image
            // alt={myData?.title}
            // onLoad={handleImageLoad}
            loading="lazy"
            // style={{ display: isImageLoaded ? "block" : "none" }}
          />
          <Typography
            variant="body2"
            sx={{ marginTop: "0rem" ,fontSize: { xs: 13, md: 14 } }}
          >
            {myData.title}
          </Typography>
        </Button>
      </Link>
    </Grid>
  );
};

export default FastSearchCard;
