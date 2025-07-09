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
          height: "130px",
          gap: ".8rem",
          margin:"1.4rem 0",
          padding:".4rem"
        }}
      >
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
              fontSize: "1.1rem",
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

        <Box
          component="img"
          sx={{
            width: "80%",
          }}
          src={require("../../../assest/images/sidebar/1.webp")}
        />
      </Box>
    </>
  );
}
