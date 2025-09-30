import { Box, Typography } from "@mui/material";
import React from "react";

export default function SideBarCard({ title, count }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            bgcolor: "#287dfa",
            color:"white",
            borderRadius: 13,
            padding: ".2rem .5rem",
            minWidth:"100px" ,
            textAlign:"center",
          }}
        >
          {title}
        </Typography>

        <Typography>{count}</Typography>
      </Box>
    </>
  );
}
