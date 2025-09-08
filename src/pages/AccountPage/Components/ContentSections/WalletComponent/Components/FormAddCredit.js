import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import MyAlertMui from "../../../../../../components/MyAlertMui/MyAlertMui";
const baseUrl = API_URL;

const FormAddCredit = ({handleIsPayed}) => {

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [amount, setAmount] = useState("");
  const [canWithdrawal, setCanWithdrawal] = useState(false);

  // alert
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  //CanWithdrawal
  const CanWithdrawal = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/Wallet/CanWithdrawal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("CanWithdrawal", response?.data?.data);
      setCanWithdrawal(response?.data?.data);
    } catch (error) {
      console.error(
        "Error fetch CanWithdrawal:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    CanWithdrawal();
  }, []);

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

  const handleWithdrawal = async () => {

    // console.log("canWithdrawal", canWithdrawal);
    const number = Number(amount.replace(/,/g, ""));

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${baseUrl}/Wallet/Withdrawal/${number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Withdrawal", response?.data);
      if (response?.data?.data === true) {
        handleIsPayed(true)
        setTimeout(() => {
          handleMangeAlert(true, "success", "پرداخت با موفقیت انجام شد");
        }, 1000);
      }else{
        setTimeout(() => {
          handleMangeAlert(true, "error", "پرداخت انجام نشد");
        }, 1000);
      }
    } catch (error) {
      console.error(
        "Error fetch CanWithdrawal:",
        error?.response?.data || error.message
      );
    }
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
            <Typography variant="h6">افزایش/کاهش موجودی کیف پول</Typography>
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
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    fontWeight: "bold",
                  }}
                >
                  {value.toLocaleString()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    ml: "2px",
                    color: "#c9c9c9",
                  }}
                >
                  تومان
                </Typography>
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

          <Grid item xs="12" md={6} sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              // color="black"
              sx={{
                width: "auto",
                width: { xs: "100%", md: "auto" },
                backgroundColor: "black",
                color: "white",
              }}
              disabled={
                parseInt(amount.replace(/,/g, "")) < 10000 || amount === ""
              } // Disable if less than 50,000 or empty
            >
              افزایش موجودی
            </Button>
          </Grid>

          <Grid
            item
            xs="12"
            md={6}
            sx={{ mt: 4, display: "flex", justifyContent: "end" }}
          >
            <Button
              // type="submit"
              onClick={() => {
                handleWithdrawal();
              }}
              variant="text"
              color="primary"
              sx={{
                width: { xs: "100%", md: "auto" },
                // "&:hover": { backgroundColor: "black", color: "white" },
              }}
              disabled={
                parseInt(amount.replace(/,/g, "")) < 10000 ||
                amount === "" ||
                !canWithdrawal
              } // Disable if less than 50,000 or empty
            >
              برداشت از حساب
            </Button>
          </Grid>
        </Grid>
      </form>

      {showAlertSetting?.show && (
        <MyAlertMui
          message={showAlertSetting?.message || ""}
          handleClose={() =>
            handleMangeAlert(
              false,
              showAlertSetting?.status,
              showAlertSetting?.message
            )
          }
          status={showAlertSetting?.status}
        />
      )}
    </Box>
  );
};

export default FormAddCredit;
