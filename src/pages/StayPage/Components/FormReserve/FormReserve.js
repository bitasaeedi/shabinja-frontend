import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Divider,
  Skeleton,
} from "@mui/material"; // Using Grid from @mui/material
import { useForm, Controller } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear"; // Clear icon
import SelectDatePopOver from "./SelectDatePopOver";
import { useRef } from "react";
import { StayPageContext } from "../../StayPage";
import { useTheme } from "@mui/material/styles";
import MobilePopOverDateSelect from "../MobileForm/components/MobilePopOverDateSelect";
import { PriceCalculationApi } from "../../../../api/toureApis";
import ToRial from "../../../../components/ToRial/ToRial";

import { useNavigate } from "react-router-dom";
import { CalculateNights } from "../../../../components/DateFunctions/DateFunctions";
import { AppContext } from "../../../../App";
const FormReserve = () => {
  const { handleShowModal, isLoginMain } = useContext(AppContext);

  const theme = useTheme();
  const stayPageContext = useContext(StayPageContext);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const [currentField, setCurrentField] = useState("");
  const [isExitDateClicked, setIsExitDateClicked] = useState(false); // Track if exitDate field was clicked
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [count, setCount] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const counterRef = useRef();
  const navigate = useNavigate();

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    // onValueChange(newCount); // Send value to parent
  };
  const decrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    // onValueChange(newCount); // Send value to parent
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    setFocus,
  } = useForm();

  useEffect(() => {
    handleSetSearch(stayPageContext.listDateSelected);
  }, [stayPageContext.listDateSelected]);

  useEffect(() => {
    calculatePrice();
  }, [getValues("entryDate"), getValues("exitDate"), count]);

  // Reset exitDate clicked state when entryDate is selected
  useEffect(() => {
    if (watch("entryDate")) {
      setIsExitDateClicked(false);
    }
  }, [watch("entryDate")]);

  // Handle form submission
  const onSubmit = (data) => {
    if (isLoginMain) {
      const stayCode = stayPageContext?.infoOfStay?.id;
      const myData = {
        start: getValues("entryDate"),
        end: getValues("exitDate"),
        count: count,
      };

      const queryParams = Object.fromEntries(
        Object.entries({
          start: myData.start,
          end: myData.end,
          count: myData.count,
        }).filter(([_, value]) => value != null && value !== "")
      );

      // Convert to query string
      const queryString = new URLSearchParams(queryParams).toString();

      const url = `/book/preview/${stayCode}?${queryString}`;

      // Navigate to the constructed URL
      navigate(url);
    } else {
      handleShowModal();
    }
  };

  const handleDateClick = (event, field) => {
    setAnchorEl(event.currentTarget);
    setCurrentField(field);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSetSearch = (listDate) => {
    const valueOfFilter = listDate[0];
    const valueOfFilter2 = listDate[1];
    setValue("entryDate", valueOfFilter || "");
    setValue("exitDate", valueOfFilter2 || "");
    if (valueOfFilter && valueOfFilter2) {
      handleClosePopover();
    }
  };

  const calculatePrice = async (data) => {
    // getValues("entryDate") && getValues("exitDate") &&
    var start = getValues("entryDate");
    var end = getValues("exitDate");
    // console.log(start, end, "calculate ");
    if (count > 0 && start && end) {
      setCalculating(true);
      setCalculatedPrice(null);

      const response = await PriceCalculationApi(
        stayPageContext?.infoOfStay?.id,
        start,
        end,
        count
      );
      console.log(response, "PriceCalculationApi");

      setCalculatedPrice(response?.data);

      setCalculating(false);
    } else {
      setCalculatedPrice(null);
    }
  };

  const inputStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "none",
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
      border: "none",
    },
  };

  // const calculateNights = (shamsiEntryDate, shamsiExitDate) => {
  //   // Convert Shamsi dates to Miladi moment objects
  //   const entryDate = moment(shamsiEntryDate, "jYYYY/jMM/jDD");
  //   const exitDate = moment(shamsiExitDate, "jYYYY/jMM/jDD");

  //   // Calculate difference in days (nights = days - 1)
  //   const nights = exitDate.diff(entryDate, "days");

  //   return nights > 0 ? nights : 0;
  // };

  return (
    <>
      <Box className="border" sx={{ minHeight: 200, py: 2, px: 3 }}>
      
        {/* فرم */}
        <Box sx={{ mt: 2, position: "relative" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0}>
              {/* 6 columns for تاریخ */}
              <Grid item xs={6} md={6} sx={{ position: "relative" }}>
                <Controller
                  name="entryDate"
                  control={control}
                  // defaultValue=""

                  rules={{
                    required: false, // "تاریخ ورود الزامی است"
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="تاریخ ورود"
                      onClick={(e) => handleDateClick(e, "entryDate")}
                      // variant="filled"
                      fullWidth
                      placeholder="وارد کنید"
                      InputLabelProps={{ shrink: true }}
                      sx={inputStyles}
                      error={!!errors.entryDate}
                      InputProps={{
                        readOnly: true, // Prevent typing
                        endAdornment: field.value && ( // Conditionally render the clear icon if there is a value
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange("");
                                setValue("exitDate", "");
                                stayPageContext.setListDateSelected([]);
                              }} // Clear the value
                              edge="end"
                            >
                              <ClearIcon sx={{ fontSize: 16, color: "gray" }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Exit Date */}
              <Grid item xs={6} md={6} sx={{ position: "relative" }}>
                {/* Alert for exitDate when no entryDate is selected */}
                {!watch("entryDate") && isExitDateClicked && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-43px",
                      right: "10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "7px 12px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      zIndex: 10,
                      wordSpacing: "2px",

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "100%",
                        right: "15px",
                        border: "6px solid transparent",
                        borderTopColor: "#dc3545",
                      },
                    }}
                  >
                    ابتدا تاریخ ورود را مشخص کنید
                  </Box>
                )}
                <Controller
                  name="exitDate"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: false, // "تاریخ خروج الزامی است"
                  }}
                  render={({ field }) => (
                    <TextField
                      onClick={(e) => {
                        if (!watch("entryDate")) {
                          setIsExitDateClicked(true); 
                          const enterDateInput = document.querySelector(
                            'input[name="entryDate"]'
                          );
                          console.log(enterDateInput.value, "enterDateInput");
                          enterDateInput.click();
                        } else {
                          setIsExitDateClicked(false); 
                          handleDateClick(e, "exitDate");
                        }
                      }}
                      {...field}
                      label="تاریخ خروج"
                      // variant="filled"
                      fullWidth
                      placeholder="وارد کنید"
                      InputLabelProps={{ shrink: true }}
                      sx={inputStyles}
                      error={!!errors.exitDate}
                      InputProps={{
                        readOnly: true, // Prevent typing
                        endAdornment: field.value && ( 
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange("");
                                stayPageContext.setListDateSelected([
                                  stayPageContext.listDateSelected[0],
                                ]);
                              }} // Clear the value
                              edge="end"
                            >
                              <ClearIcon sx={{ fontSize: 16, color: "gray" }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              {anchorEl && !isMobile && (
                <SelectDatePopOver
                  callBackFunc={stayPageContext.handleChangeDate}
                  valueDefault={stayPageContext.listDateSelected}
                  anchorEl={anchorEl}
                  handleClosePopover={handleClosePopover}
                  listDayesWithPrice={stayPageContext?.listPrices}
                />
              )}
            </Grid>
            <Grid container spacing={0}>
              <Grid
                item
                xs={12}
                sx={{
                  mt: 0,
                  py: 1,
                  px: 2,
                  border: "2px solid #e9e9e9",
                  borderTop: "none",
                  borderRadius: "0 0 5px 5px",
                }}
                // className="rounded "
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Label */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    تعداد نفرات
                    <br />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 200,
                        color: "#333",
                      }}
                    >
                      {count === 0 ? "مهم نیست" : `${count} نفر`}
                    </Typography>
                  </Typography>
                  {/* Counter Section */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {/* Increment Button */}
                    <Button
                      variant="outlined"
                      onClick={increment}
                      sx={{
                        fontSize: 16,
                        minWidth: "20px",
                        height: "20px",
                        borderRadius: "10%",
                        padding: 0,
                        borderColor: "#000",
                      }}
                      disabled={
                        count >= stayPageContext.infoOfStay?.maxCapacity
                      }
                    >
                      +
                    </Button>
                    {/* Count Display */}
                    <TextField
                      value={count}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        const maxCapacity = stayPageContext.infoOfStay?.maxCapacity || 999;
                        const newCount = Math.max(0, Math.min(value, maxCapacity));
                        setCount(newCount);
                      }}
                      inputProps={{
                        readOnly: false,
                        style: {
                          textAlign: "center",
                          fontSize: "16px",
                          padding: "4px 5px",
                          border: "none",
                          backgroundColor: "transparent",
                          maxWidth: "20px",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none",
                          },
                          "&:hover fieldset": {
                            border: "none",
                          },
                          "&.Mui-focused fieldset": {
                            border: "none",
                          },
                        },
                        "& .MuiInputBase-input": {
                          cursor: "text",
                        },
                      }}
                    />

                    {/* Decrement Button */}
                    <Button
                      variant="outlined"
                      onClick={decrement}
                      disabled={count <= 1 ? true : false}
                      sx={{
                        fontSize: 16,
                        minWidth: "20px",
                        height: "20px",
                        borderRadius: "10%",
                        padding: 0,
                        borderColor: "#000",
                      }}
                    >
                      -
                    </Button>
                  </Box>
                </Box>
              </Grid>
              {/* Full-width row for تایید button */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="dark"
                  fullWidth
                  sx={{
                    color: "white",
                    fontSize: 18,
                    backgroundColor: "#212121", // Ensures dark background
                    "&:hover": {
                      opacity: 0.8,
                      backgroundColor: "#212121", // Maintain dark background on hover
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                      backgroundColor: "#212121", // Maintain dark background when clicked
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#424242", // Slightly lighter dark color when disabled
                      color: "rgba(255, 255, 255, 0.5)", // Semi-transparent white text
                      cursor: "not-allowed", // Show not-allowed cursor
                    },
                  }}
                  disabled={!(calculatedPrice?.mainPrice > 0)}
                >
                  تایید
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {/* قیمت محاسبه شده */}
        <Box
          sx={{
            mt: 2,
            fontSize: 13,
            display: calculatedPrice?.mainPrice > 0 ? "block" : "none",
          }}
        >
          {/*  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#999",
            }}
          >
            <Box>
              <Typography>
                {CalculateNights(getValues("entryDate"), getValues("exitDate"))}
                شب اقامت
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography> {ToRial(calculatedPrice?.price)} تومان </Typography>
            </Box>
          </Box>
          {/*  */}

          {/* نفرات اضافه */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#999",
            }}
          >
            <Box>
              <Typography>
                {count - stayPageContext.infoOfStay?.minCapacity > 0
                  ? count - stayPageContext.infoOfStay?.minCapacity
                  : 0}{" "}
                نفر اضافه
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography>
                {" "}
                {ToRial(calculatedPrice?.extraPersonPrice)} تومان{" "}
              </Typography>
            </Box>
          </Box>

          {/* نفرات اضافه */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#999",
            }}
          >
            <Box>
              <Typography>مبلغ تخفیف </Typography>
            </Box>
            <Box>
              {" "}
              <Typography>
                {" "}
                {ToRial(calculatedPrice?.totalDiscountPrice)} تومان{" "}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* جکمع */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography> مبلغ قابل پرداخت</Typography>
            </Box>
            <Box>
              {" "}
              <Typography>
                {" "}
                {ToRial(calculatedPrice?.mainPrice)} تومان{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* loading calculating */}
        {calculating && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#999",
                mt: 2,
              }}
            >
              <Box>
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              <Box>
                <Skeleton variant="text" width={80} height={20} />
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Skeleton variant="text" width={120} height={20} />
              </Box>
              <Box>
                <Skeleton variant="text" width={80} height={20} />
              </Box>
            </Box>
          </>
        )}
      </Box>

      {anchorEl && isMobile && (
        <MobilePopOverDateSelect
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
          onChange={stayPageContext.handleChangeDate}
          values={stayPageContext.listDateSelected}
          listDayesWithPrice={stayPageContext?.listPrices}
        />
      )}
    </>
  );
};

export default FormReserve;
