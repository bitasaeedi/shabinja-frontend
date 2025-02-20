import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const CreditCard = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [shaba, setShaba] = useState("");
  const amount = 250000;

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*$/.test(inputValue)) {
      setShaba(inputValue);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Box>
      <Grid container spacing={2} direction="column">
        {/* Form Section */}
        <Grid item xs={12} order={{ xs: 1, md: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography>شماره شبا</Typography>
                <Controller
                  name="shaba"
                  control={control}
                  render={({ field: { ref } }) => (
                    <TextField
                      dir="ltr"
                      fullWidth
                      size="small"
                      type="text"
                      inputRef={ref}
                      placeholder="شماره شبا"
                      value={shaba}
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "0.8rem",
                          textAlign: "left",
                          direction: "rtl",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontSize: 14 }}>
                  صاحب حساب: پدرام محمدی
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  نام بانک: سامان
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: { xs: "100%", md: "auto" },
                    backgroundColor: "black",
                    color: "white",
                    py: 1,
                  }}
                  size="small"
                >
                  ویرایش شبا
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        {/* Credit Card Section */}
        <Grid item xs={12} order={{ xs: 0, md: 0 }}>
          <Box
            sx={{
              width: { xs: "100%", md: "100%" },
              height: { xs: 150, md: 200 },
              borderRadius: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#fff",
              background: "linear-gradient(135deg, #287dfa, #6a11cb)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              shabinja.com
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">موجودی کیف پول</Typography>
              <Box className="d-flex">
                <Typography variant="body1" fontWeight="bold">
                  {amount.toLocaleString()}
                </Typography>
                <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                  تومان
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreditCard;
