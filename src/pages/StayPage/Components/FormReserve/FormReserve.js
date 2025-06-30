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
const FormReserve = () => {
  const theme = useTheme();
  const stayPageContext = useContext(StayPageContext);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const [currentField, setCurrentField] = useState("");
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

  // Handle form submission
  const onSubmit = (data) => {
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
    console.log(start, end, "calculate ");
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
        {/* <Box
          sx={{
            mb: 3,
          }}
          className="d-flex justify-content-start align-items-center"
        >
          <Typography
            variant="span"
            sx={{
              fontSize: "14px",
            }}
          >
            شروع از:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              padding: "0 5px",
            }}
          >
            12،000 ریال
          </Typography>
          <Typography
            variant="span"
            sx={{
              fontSize: "12px",
            }}
          >
            / هرشب
          </Typography>
        </Box> */}
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
                        const enterDateInput = document.querySelector(
                          'input[name="entryDate"]'
                        );
                        console.log(enterDateInput.value, "enterDateInput");
                        if (!watch("entryDate")) {
                          enterDateInput.click();
                        } else {
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
                        endAdornment: field.value && ( // Conditionally render the clear icon if there is a value
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
                    <Typography
                      sx={{
                        fontSize: "16px",
                        minWidth: "30px",
                        textAlign: "center",
                      }}
                    >
                      {count}
                    </Typography>

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
              <Typography> {ToRial(calculatedPrice?.price)} ریال </Typography>
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
                {ToRial(calculatedPrice?.extraPersonPrice)} ریال{" "}
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
                {ToRial(calculatedPrice?.totalDiscountPrice)} ریال{" "}
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
                {ToRial(calculatedPrice?.mainPrice)} ریال{" "}
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
