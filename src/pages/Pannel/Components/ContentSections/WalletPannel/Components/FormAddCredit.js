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

const FormAddCredit = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [amount, setAmount] = useState("");

  const formatAmount = (value) => {
    if (!value) return "";
    return Number(value.replace(/,/g, "")).toLocaleString(); // Format with commas
  };

  const handleButtonClick = (value) => {
    const currentAmount = parseInt(amount.replace(/,/g, "")) || 0; // Parse current amount
    const newAmount = currentAmount + value;
    setAmount(newAmount > 0 ? formatAmount(newAmount.toString()) : "0"); // Update state
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*$/.test(inputValue)) {
      setAmount(formatAmount(inputValue)); // Update formatted value
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, amount });
  };

  return (
    <Box
      sx={{
        px: 1,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs="12">
            <Typography variant="h6">افزایش موجودی کیف پول</Typography>
            <Typography variant="body2" sx={{ fontSize: 13, mt: 1 }}>
              با شارژ موجودی حساب خود می‌توانید با سرعت و سهولت بیشتری خرید کنید
            </Typography>
          </Grid>
          <Grid
            item
            xs="12"
            sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}
            gap={1}
          >
            {[50000, 100000, 150000].map((value) => (
              <Button
                key={value}
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#ccc",
                }}
                fullWidth
                onClick={() => handleButtonClick(value)} // Subtract button value
              >
                {value.toLocaleString()} تومان
              </Button>
            ))}
          </Grid>
          <Grid item xs="12" sx={{ mt: 2 }}>
            <Controller
              name="amount"
              control={control}
              //   rules={{ required: "الزامی است" }}
              render={({ field: { ref } }) => (
                <TextField
                  dir="ltr"
                  fullWidth
                  size="small"
                  type="text"
                  inputRef={ref}
                  placeholder="مبلغ دلخواه خود را وارد کنید" // Placeholder text
                  //   error={!!errors.amount}
                  //   helperText={errors.amount?.message}
                  value={amount}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                          تومان
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      fontSize: "0.8rem", // Smaller font size for the placeholder
                      textAlign: "left",
                      direction: "rtl", // Right-to-left alignment
                    },
                    "& .MuiInputBase-input": {
                      // textAlign: "left", // Align the value to the left
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs="12" sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "auto",
                width: { xs: "100%", md: "auto" },
              }}
              disabled={
                parseInt(amount.replace(/,/g, "")) < 10000 || amount === ""
              } // Disable if less than 50,000 or empty
            >
              افزایش موجودی
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormAddCredit;
