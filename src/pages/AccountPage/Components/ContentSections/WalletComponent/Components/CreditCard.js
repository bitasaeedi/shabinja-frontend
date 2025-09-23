import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../../../../../../App";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const baseUrl = API_URL;

const CreditCard = ({ isPayed }) => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [shaba, setShaba] = useState("");
  const [balance, setBalance] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value.replace(/,/g, ""); // Remove commas
  //   if (/^\d*$/.test(inputValue)) {
  //     setShaba(inputValue);
  //   }
  // };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  // get shaba data
  const getDate = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(`${baseUrl}/Wallet/Inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("shaba data", response?.data?.data);
      setBalance(response?.data?.data);
      setShaba(response?.data?.data?.cartNumberBank);
    } catch (error) {
      console.error(
        "Error fetch shaba:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getDate();
  }, [isPayed]);

  return (
    <Box>
      <Grid container spacing={2} direction="column">
        {/* Form Section */}
        <Grid item xs={12} order={{ xs: 1, md: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{ minWidth: "340px" }}>
              {/* cart */}
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
                      InputProps={{
                        readOnly: true,
                      }}
                      // onChange={handleInputChange}
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

              {/* infos */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontSize: 14 }}>
                  صاحب حساب: {appContext?.userInfo?.name}{" "}
                  {appContext?.userInfo?.lastName}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  نام بانک: سامان
                </Typography>
              </Grid>

              {/*  */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                }}
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
                  onClick={() => {
                    navigate("/account/profile");
                  }}
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
              height: { xs: 215, md: 215 },
              borderRadius: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "#fff",
              background: "linear-gradient(135deg, #287dfa, #6a11cb)",
              backgroundColor: "linear-gradient(135deg, #287dfa, #6a11cb)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "rgba(255,255,255,0.2)" }}
              >
                shabinja.com
              </Typography>

              {/* مشاهده جزییات */}
              <Button
                sx={{
                  fontSize: ".71rem",
                  border: 0,
                  px: ".4rem",
                  color: "white",
                }}
                onClick={() => {
                  setShowDetails(!showDetails);
                }}
              >
                مشاهده جزئیات
                <ArrowDropDownIcon
                  sx={{
                    mb: ".15rem",
                    fontSize:"1.15rem",
                    padding:"0rem !important"
                  }}
                />
              </Button>
            </Box>

            <Box>
              {/* موجودی کیف پول */}
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
                    {balance?.inventory?.toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                    تومان
                  </Typography>
                </Box>
              </Box>

              {showDetails && (
                <Box>
                  {/* قابل برداشت */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: ".4rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      موجودی قابل برداشت
                    </Typography>
                    <Box className="d-flex">
                      <Typography variant="body1" fontWeight="bold">
                        {balance?.withdrawableInventory?.toLocaleString()}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                        تومان
                      </Typography>
                    </Box>
                  </Box>

                  {/* قابل استغاده */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: ".4rem",
                    }}
                  >
                    <Typography variant="subtitle2">
                      موجودی قابل استفاده
                    </Typography>
                    <Box className="d-flex">
                      <Typography variant="body1" fontWeight="bold">
                        {balance?.usableInventory?.toLocaleString()}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                        تومان
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreditCard;
