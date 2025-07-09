import { Box, Typography } from "@mui/material";
import React from "react";

export default function ContentCard({index , item}) {
  return (
    <>
      <Box
        sx={{
          width: "300px",
          height: "350px",
          position: "relative",
          marginBottom:"5.5rem"
        }}
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
            height: "125px",
            bgcolor: "black",
          }}
        ></Box>
        {/* text */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-5rem",
            padding: "1rem",
            bgcolor: "white",
            width: "280px",
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
