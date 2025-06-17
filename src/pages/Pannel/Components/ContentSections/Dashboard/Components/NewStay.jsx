import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NewStay({isMobile}) {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h6" sx={{ fontSize: "16px", mb: 1, textAlign: isMobile?"left0": "center" }}>
        ثبت اقامتگاه جدید
      </Typography>

      <Box
        className="shadow borde rounded"
        sx={{ width: "100%",
           position: "relative",
           padding:"2rem" }}
      >
        <Typography variant="h6" sx={{ fontSize: "16px", textAlign: "center" }}>
           برای ثبت اقامتگاه جدید <span style={{color:"#106DF6"}}>اینجا</span> کلیک کنید.
        </Typography>

        <Button
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "0rem .8rem",
            minWidth: 0,
            fontSize: "1.2rem",
            position: "absolute",
            bottom: "-1.2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
          onClick={()=>{navigate("/new-stay/wizard")}}
        >
          +
        </Button>

      </Box>
    </>
  );
}
