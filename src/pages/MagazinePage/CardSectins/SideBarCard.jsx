import { Box, Typography } from "@mui/material";
import React from "react";

export default function SideBarCard({title,date}) {
  return (
    <>
      <Box

      className="border round shadow"
        sx={{
          display: "flex",
          width: "100%",
          height: "115px",
          gap: ".8rem",
          margin:"1.4rem 0",
          padding:".5rem"
        }}
      >
        {/* text part */}
        <Box
          sx={{
            width: "90%",
            textAlign: "right",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2"
          sx={{
            color:"#555",
            fontSize:".8rem"
          }}> {date}</Typography>
        </Box>

        {/* image part */}
        <Box
          component="img"
          sx={{
            width: "150px",
            objectFit: "cover",
          
          }}
          src={require("../../../assest/images/sidebar/1.webp")}
        />
      </Box>
    </>
  );
}
