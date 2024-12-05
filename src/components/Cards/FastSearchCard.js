import { Typography, Button, Grid } from "@mui/material"; // Use MUI Button
import React from "react";

const FastSearchCard = ({ myData }) => {
  return (
    <Grid item>
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: { xs: 100, md: 100 },
          height: 100,
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#37474f",

          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
        }}
        // className="border border-primary"
      >
        {myData.icon}
        <Typography
          variant="h6"
          sx={{ marginTop: 1, fontSize: { xs: 14, md: 18 } }}
        >
          {myData.label}
        </Typography>
      </Button>
    </Grid>
  );
};

export default FastSearchCard;
