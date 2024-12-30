import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material"; // Using Grid from @mui/material
import { useForm, Controller } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear"; // Clear icon
import SelectDatePopOver from "./SelectDatePopOver";
import { useRef } from "react";
import { StayPageContext } from "../../StayPage";
const FormReserve = () => {
  const stayPageContext = useContext(StayPageContext);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const [currentField, setCurrentField] = useState("");

  const [count, setCount] = useState(0);

  const counterRef = useRef();

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
    setFocus,
  } = useForm();

  useEffect(() => {
    console.log(stayPageContext.listDateSelected, "listDate");
    handleSetSearch(stayPageContext.listDateSelected);
  }, [stayPageContext.listDateSelected]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
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

  const inputStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "none",
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
      border: "none",
    },
  };

  return (
    <>
      <Box className="border" sx={{ minHeight: 200, py: 2, px: 3 }}>
        <Box
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
            12،000 تومان
          </Typography>
          <Typography
            variant="span"
            sx={{
              fontSize: "12px",
            }}
          >
            / هرشب
          </Typography>
        </Box>
        <Box sx={{ mt: 2, position: "relative" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0}>
              {/* 6 columns for تاریخ */}
              <Grid item xs={12} md={6} sx={{ position: "relative" }}>
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
              <Grid item xs={12} md={6} sx={{ position: "relative" }}>
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
              {anchorEl && (
                <SelectDatePopOver
                  callBackFunc={stayPageContext.handleChangeDate}
                  valueDefault={stayPageContext.listDateSelected}
                  anchorEl={anchorEl}
                  handleClosePopover={handleClosePopover}
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
                      disabled={count <= 0 ? true : false}
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
                    "&:hover": {
                      opacity: 0.8, // optional: reduces opacity when hovered
                    },
                    "&:active": {
                      // backgroundColor: "#106df6", // background color when clicked
                      transform: "scale(0.98)", // optional: makes the button slightly smaller on click
                    },
                  }}
                  // size="small"
                >
                  تایید
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default FormReserve;
