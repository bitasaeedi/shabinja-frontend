import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import { UserSearchOneApi } from "../../../../../../api/Users.api";
import CreditCard from "./CreditCard";
import FormAddCredit from "./FormAddCredit";
import ContainerMain from "./TableTarakonesh/ContainerMain";

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

  const [isPayed, setIsPayed] = useState(false);

  function handleIsPayed(value){
    setIsPayed(value)
  }

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
        <Grid
          container
          spacing={2}
          alignItems="start"
          sx={{
            my: 2,
          }}
        >
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
              order: { xs: 2, md: 2 },
            }}
          >
            <CreditCard isPayed={isPayed}/>
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
                height: 350,
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
              my: { xs: 0, md: 0 },
              order: { xs: 0, md: 0 }, // Form appears last on mobile and first on desktop
            }}
          >
            <FormAddCredit  handleIsPayed={handleIsPayed}/>
          </Grid>
          
        </Grid>

        <Grid container>
          <Grid item xs="12">
            <ContainerMain />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormWallet;
