import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContentCard({index , item}) {
  const navigate = useNavigate();
  const handleClick = (itemId) => {
    navigate(`/mag/${itemId}`);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "350px",
          position: "relative",
          marginBottom:"5.5rem",
          cursor:"pointer"
        }}
        onClick={() => handleClick(1)}
      >
        <Box
          component="img"
          src={require(`../../../assest/images/sidebar/${(index+1)%4}.webp`)}
          alt="post-img"
          sx={{
            width: "100%",
            height: "350px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "150px",
            height: {xs:"125px",sm:"90px",md:"100px",lg:"125px",xl:"110px"},
            bgcolor: "black",
          }}
        ></Box>
        {/* text */}
        <Box
          sx={{
            position: "absolute",
            bottom: {xs:"-6rem",sm:"-6rem",md:"-5.5rem",lg:"-5rem",xl:"-4.3rem"},
            padding: "1rem",
            bgcolor: "white",
            width: "95%",
          }}
        >
          <Typography variant="h6">{item.title}</Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: "1.5rem",
              fontSize: "1rem",
            }}
          >
            {item.info}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
