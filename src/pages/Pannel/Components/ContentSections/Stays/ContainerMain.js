import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const ContainerMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        mx: "auto",
      }}
    >
      <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{
          fontSize: "18px",
          display: { xs: "none", md: "flex" },
        }}
      >
        اقامتگاه‌ها
      </Typography>

      <Box
        sx={{
          p: 3,
          // backgroundColor:"#f9f9f9"
        }}
        className="shadow border rounded"
      >
        <Button component={Link} to={"/new-stay/start"}>
          افزودن اقامتگاه
        </Button>
      </Box>
    </Box>
  );
};

export default ContainerMain;
