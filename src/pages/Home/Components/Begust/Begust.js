import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Begust = () => {
  return (
    <Box
      sx={{
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
        bgcolor: "#0d47a1",
        background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)",
        color: "white",
        mb: 5,
        borderRadius: 2, // Slightly rounded corners for a softer look
        textAlign: "center",
      }}
    >
      <Grid
        container
        sx={{ width: { xs: "100%", md: "80%" }, mx: "auto", mt: 2 }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            میزبانی و کسب درآمد
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              maxWidth: { xs: "100%", md: "75%" },
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.8,
              opacity: 0.9, // Softer contrast for readability
            }}
          >
            به جمع میزبانان بپیوندید و اقامتگاه خود را ثبت کنید و شروع کنید به
            درآمد زایی
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #ff9800, #ff5722)",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #e65100, #bf360c)",
              },
            }}
          >
            بیشتر بدانید
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Begust;
