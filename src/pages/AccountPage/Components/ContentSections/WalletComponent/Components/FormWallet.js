import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { UserSearchOneApi } from "../../../../../../api/Users.api";
import CreditCard from "./CreditCard";
import FormAddCredit from "./FormAddCredit";

const FormWallet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
  };

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
        کیف پول
      </Typography>

      <Box
        sx={{
          p: 3,
        }}
        className="shadow borde rounded"
      >
        <Grid container spacing={2} alignItems="stretch">
          {/* Credit Card Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: { xs: 0, md: 0 },
              order: { xs: 1, md: 2 }, // Order on mobile (xs) is 1, on desktop (md) is 2
            }}
          >
            <CreditCard />
          </Grid>

          {/* Vertical Divider */}
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              justifyContent: "center",
              alignItems: "start",
              display: { xs: "none", md: "flex" },
              order: { xs: 0, md: 1 },
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: "100%",
                borderRightWidth: "1px",
              }}
            />
          </Grid>

          {/* Form Section */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              my: 2,
              order: { xs: 2, md: 0 }, // Form appears last on mobile and first on desktop
            }}
          >
            <FormAddCredit />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormWallet;
