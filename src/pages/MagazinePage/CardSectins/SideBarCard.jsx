import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MagPageContext } from "../MagazinePage";

export default function SideBarCard({ title, count , isMobile , id }) {
  const {handleCategoryFilter}=useContext(MagPageContext);
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
            padding: isMobile ? ".15rem .2rem" : ".2rem .5rem",
            minWidth:isMobile ? "85px" : "100px" ,
            textAlign:"center",
            fontSize: isMobile ? ".9rem" : "1rem",
            cursor:"pointer"
          }}
          onClick={()=>{handleCategoryFilter(id)}}
        >
          {title}
        </Typography>

        <Typography>{count}</Typography>
      </Box>
    </>
  );
}
