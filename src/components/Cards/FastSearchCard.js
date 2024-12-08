import { Typography, Button, Grid } from "@mui/material"; // Use MUI Button
import React from "react";
import { Link } from "react-router-dom";
const FastSearchCard = ({ myData = {} }) => {
  return (
    <Grid item>
      <Link
        to={myData?.linkAddres}
        style={{ textDecoration: "none", display: "block", width: "100%" }}
      >
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: { xs: 100, md: 100 },
            height: { xs: 100, md: 100 },
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "#37474f",

            "&:hover": { backgroundColor: { md: "rgba(0, 0, 0, 0.05)" } },
          }}
        >
          {myData.icon}
          <Typography
            variant="h6"
            sx={{ marginTop: 1, fontSize: { xs: 14, md: 18 } }}
          >
            {myData.label}
          </Typography>
        </Button>
      </Link>
    </Grid>
  );
};

export default FastSearchCard;
