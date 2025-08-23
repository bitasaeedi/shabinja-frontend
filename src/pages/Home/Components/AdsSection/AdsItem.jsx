import { Box } from "@mui/material";
import React from "react";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";

export default function AdsItem({ item }) {
  return (
    <>
      <Box
      className="shadow border rounded"
        sx={{
          width: "250px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
         // alignItems: "center",
         // justifyContent: "center",
          gap:"1rem",
          padding:".5rem"
        }}
      >
        {/* top */}
        <Box>{item?.tag}</Box>

        {/* sale */}
        <Box
        sx={{
            backgroundColor:"red",
            color:"white",
            width:"50px"
        }}
        >
            {item.percent}
        </Box>

        {/* img */}
        <Box component={"img"} src={item.image} alt="name" sx={{
            width:"150px",
            margin:"0 auto"
        }} />

        {/* bottom */}
        <Box>
            {item.title}
        </Box>
      </Box>
    </>
  );
}
