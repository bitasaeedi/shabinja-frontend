import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme, alpha } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import FormDate from "../../../../components/FormDate/FormDate";
import PeopleCounter from "../../../../components/popups/PeopleCounter/PeopleCounter";
import ClearIcon from "@mui/icons-material/Clear"; // Clear icon
import SelectCity from "../../../../components/popups/SelectCity/SelectCity";
import { HostTourSearchTitleApi } from "../../../../api/toureApis";
import { useNavigate } from "react-router-dom";
import DesctopSelectDate from "./DesctopSelectDate";
import {
  GetMiladiStdFunc,
  GetShamsiDateDetails,
} from "../../../../components/DateFunctions/DateFunctions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white, // Set to white
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.85), // Slight darkening on hover
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  left: 0, // Move the icon to the right
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer", // Ensures the cursor changes to a pointer
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "1px solid", // Adds a solid border
  borderColor: "#ffff", // Corrected the color value
  borderRadius: 5,
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: theme.spacing(2), // Adjust right padding
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  cursor: "pointer", // Ensures the cursor changes to a pointer
}));

const MainSearchForm = () => {
  
  const [calendarAnchor, setCalendarAnchor] = useState(null); // Track calendar visibility
  const [currentField, setCurrentField] = useState("");
  const [loadingSearchCitis, setLoadingSearchCitis] = useState(false);
  const [peopleCountAnchor, setPeopleCountAnchor] = useState(null);
  const [objectOfLisDatas, setObjectOfLisDatas] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  // Use the `useNavigate` hook
  const navigate = useNavigate();
  const texts = ["اقامتگاه‌ها", "کلبه‌ها", "ویلاها"]; // Dynamic texts
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setFocus,
  } = useForm();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Reset animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length); // Update text index
        setAnimate(true); // Trigger animation
      }, 100); // Small delay to reset animation
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);


  const onSubmit = (data) => {
    console.log("sele",selectedCity);
    
    if (selectedCity.titleEn) {
      if (data.entryDate && !data.exitDate) {
        const exitDateInput = document.querySelector('input[name="exitDate"]');
        exitDateInput.click();
        return;
      }
      if (!data.entryDate && data.exitDate) {
        const entryDateInput = document.querySelector(
          'input[name="entryDate"]'
        );
        entryDateInput.click();
        return;
      }
      // Build the query string
      const queryParams = Object.fromEntries(
        Object.entries({
          start: data.entryDate,
          end: data.exitDate,
          count: data.peopleCount,
        }).filter(([_, value]) => value != null && value !== "")
      );

      // Convert to query string
      const queryString = new URLSearchParams(queryParams).toString();

      // Construct the URL
      const url = `/search/${selectedCity.titleEn}?${queryString}`;

      // Navigate to the constructed URL
      navigate(url);
    } else {
      // Set error for city field when no city is selected
      setValue("city", "", { shouldValidate: true });
      setFocus("city");
    }
  };

  const handleDateClick = (event, field) => {
    setCalendarAnchor(event.currentTarget);
    setCurrentField(field);
  };

  const handleDateSelect = (value) => {
    if (Array.isArray(value)) {
      const list = value.map((date) => {
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        return {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
      });
      handleSetDates(list);
    } else {
      // console.log(value.toObject(), "calendar normal");
    }
  };

  const handleSetDates = (list) => {
    if (list.length === 1) {
      setValue("entryDate", list[0]?.shamsiObj?.fullshamsi);
      setValue("exitDate", "");
      const exitDateInput = document.querySelector('input[name="exitDate"]');
      exitDateInput.focus(); // Focus on the exit date input
      exitDateInput.click();
    } else if (list.length > 1) {
      setValue("entryDate", list[0]?.shamsiObj?.fullshamsi);
      setValue("exitDate", list[1]?.shamsiObj?.fullshamsi);
      setCalendarAnchor(null);
      const pepoleInput = document.querySelector('input[name="peopleCount"]');
      pepoleInput.focus(); // Focus on the exit date input
      pepoleInput.click();
    }
  };

  const handleSearchCities = async (textToSearch) => {
    setSelectedCity({});
    if (textToSearch.length >= 3 || textToSearch.length == 0) {
      setLoadingSearchCitis(true);
      const resultGetTours = await HostTourSearchTitleApi({
        title: textToSearch,
      });
      var objectList = resultGetTours?.data;
      // console.log(objectList, "resultGetTours list", textToSearch);
      setObjectOfLisDatas(objectList);
      setLoadingSearchCitis(false);
    }
  };
  
  const inputStyles = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",

    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
      borderRadius: "8px",
      height: "70px", // Input height
      paddingLeft: "10px",
    },
    "& .MuiInputLabel-root": {
      top: "8px", // Move label closer to input from the top
      right: "16px", // Add margin from the right
      fontSize: "16px", // Optional: Adjust label font size
      paddingLeft: "10px",
    },
    "& .MuiFilledInput-input": {
      paddingTop: "20px", // Move the input value or placeholder slightly upwards
      paddingLeft: "10px",
    },
    "& .MuiFormHelperText-root": {
      marginRight: "10px",
      fontSize: "12px",
    },
    // "& .MuiFormLabel-filled": {
    //   // To ensure the label stays in place when focused or with value
    //   transform: "translate(12px, -10px) scale(0.75)",
    // },
  };

  return (
    <>
      <Box sx={{ p: 0, width: "100%", maxWidth: "830px", mx: "auto" }}>
        <Box
          className="section-heading text-end mt-5 mb-3"
          // sx={{ width: "54%", mx: "auto" }}
        >
          <Typography variant="h2" className="text-white" sx={{ fontSize: 25 }}>
            شگفت‌انگیزترین{" "}
            <span className={`dynamic-text ${animate ? "appear" : ""}`}>
              {texts[currentIndex]}
            </span>{" "}
            در انتظارته!
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid
              container
              spacing={0}
              alignItems="center"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              {/* City Autocomplete */}
              <Grid item xs={12} md={3} sx={{ position: "relative" }}>
                {/* Error bubble above the input */}
                {!selectedCity.titleEn && !!errors.city && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-50px",
                      right: "10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "7px 12px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      zIndex: 10,
                      wordSpacing:"2px",

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
                    لطفاً  مقصد یا اقامتگاه را  از  بین گزینه‌ها انتخاب کنید!
                  </Box>
                )}
                <Controller
                  name="city"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="جستجو شهر، استان یا اقامتگاه"
                      onClick={(e) => handleDateClick(e, "city")}
                      variant="filled"
                      fullWidth
                      placeholder="انتخاب مقصد"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        ...inputStyles,
                        "& .MuiFilledInput-root": {
                          ...inputStyles["& .MuiFilledInput-root"],
                         },
                      }}
                      error={!selectedCity.titleEn && !!errors.city}
                      InputProps={{
                        autoComplete: "off",
                        // readOnly: false, // Prevent typing
                        onChange: (e) => {
                          field.onChange(e); // Update the Controller's state
                          handleSearchCities(e.target.value); // Perform your custom logic
                        },
                        endAdornment: field.value && ( // Conditionally render the clear icon if there is a value
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                field.onChange("");
                              }}
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
                {/* Border between inputs */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: "0",
                    height: "70%", // 70% of the input height
                    width: "1px", // Thin border
                    backgroundColor: "#d3d3d3", // Light gray color
                  }}
                />
              </Grid>

              {/* Entry Date */}
              <Grid item xs={12} md={3} sx={{ position: "relative" }}>
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
                      variant="filled"
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
                              onClick={() => {
                                field.onChange("");
                                setValue("exitDate", "");
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
                {/* Border between inputs */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: "0",
                    height: "70%", // 70% of the input height
                    width: "1px", // Thin border
                    backgroundColor: "#d3d3d3", // Light gray color
                  }}
                />
              </Grid>

              {/* Exit Date */}
              <Grid item xs={12} md={3} sx={{ position: "relative" }}>
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
                      variant="filled"
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
                              onClick={() => field.onChange("")} // Clear the value
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
                {/* Border between inputs */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: "0",
                    height: "70%", // 70% of the input height
                    width: "1px", // Thin border
                    backgroundColor: "#d3d3d3", // Light gray color
                  }}
                />
              </Grid>

              {calendarAnchor && (
                <Box
                  sx={{
                    position: "absolute",
                    top:
                      calendarAnchor.getBoundingClientRect().bottom +
                      window.scrollY +
                      -40,
                    right: calendarAnchor.getBoundingClientRect().left,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    zIndex: 1000,
                    transform: `translate(${
                      currentField == "city"
                        ? "50px"
                        : currentField == "peopleCount"
                        ? "110px"
                        : "100px"
                    }, 0)`,
                  }}
                >
                  {currentField == "peopleCount" ? (
                    <PeopleCounter
                      onValueChange={(countNum) =>
                        setValue("peopleCount", countNum || 0)
                      }
                      defaultCount={parseFloat(watch("peopleCount"))}
                      closePopup={() => setCalendarAnchor(null)}
                    />
                  ) : currentField == "city" ? (
                    <SelectCity
                      closePopup={() => setCalendarAnchor(null)}
                      selectedCity={(item) => {
                        setValue("city", item?.title);
                        setSelectedCity(item);
                        setCalendarAnchor(null);
                        const pepoleInput = document.querySelector(
                          'input[name="entryDate"]'
                        );
                        pepoleInput.focus(); // Focus on the exit date input
                        pepoleInput.click();
                      }}
                      objectOfLisDatas={objectOfLisDatas}
                      loading={loadingSearchCitis}
                    />
                  ) : (
                    <DesctopSelectDate
                      anchorEl={calendarAnchor}
                      handleClosePopover={() => setCalendarAnchor(null)}
                      onChange={handleDateSelect}
                      values={[watch("entryDate"), watch("exitDate")]}
                    />
                    // <FormDate
                    //   returnDate={handleDateSelect}
                    //   closePopup={() => setCalendarAnchor(null)}
                    // />
                  )}
                  {/*  */}
                </Box>
              )}

              {/* Number of People */}
              <Grid item xs={12} md={2}>
                <Controller
                  name="peopleCount"
                  control={control}
                  defaultValue=""
                  placeholder="انتخاب کنید"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="تعداد نفرات"
                      variant="filled"
                      onClick={(e) => handleDateClick(e, "peopleCount")}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={inputStyles}
                      value={field.value ? `${field.value} نفر` : ""} // Show value or empty string
                      placeholder="انتخاب کنید" // Placeholder when value is empty or null
                      InputProps={{
                        readOnly: true, // Prevent typing
                        endAdornment: field.value && ( // Conditionally render the clear icon if there is a value
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => field.onChange("")} // Clear the value
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

              {/* Search Button */}
              <Grid
                item
                xs={12}
                md={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%", // Ensure it takes the full width
                  height: "100%", // Ensure it takes the full height
                  // backgroundColor: "#dc3545",
                }}
              >
                <Box className=" h-100 w-100 px-2">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      height: 40,
                      // width: "20px", // Force exact width
                      minWidth: 43, // Override default min-width
                      // maxWidth: "20px", // Enforce max width
                      padding: 0, // Remove padding for exact sizing
                      borderRadius: "8px",
                    }}
                    size="small"
                  >
                    <SearchIcon sx={{ color: "white", fontSize: 20 }} />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          height: "auto",
        }}
        className=" w-100 "
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="جستجو شهر، استان یا اقامتگاه "
            inputProps={{ "aria-label": "search" }}
            // onChange={handleSearchChange}
          />
        </Search>
      </Box>
    </>
  );
};

export default MainSearchForm;
