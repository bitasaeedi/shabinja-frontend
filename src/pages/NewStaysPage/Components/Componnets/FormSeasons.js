import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useForm, Controller } from "react-hook-form";
import InputeContainer from "./InputeContainer";
import { Watch } from "@mui/icons-material";
const FormSeasons = ({ item }) => {
  const { control, handleSubmit, setValue, getValues, watch } = useForm({});

  const [isOpen, setIsOpen] = useState(true);

  // Toggle Spring Collapse
  const handleToggleSpring = () => {
    setIsOpen((prev) => !prev);
  };

  const formatAmount = (value) => {
    if (!value) return "";
    return Number(value.replace(/,/g, "")).toLocaleString(); // Format with commas
  };

  const handleInputChange = (e, nameInput) => {
    const inputValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*$/.test(inputValue)) {
      setValue(nameInput, formatAmount(inputValue));
    }
  };

  return (
    <Box className="shadow-sm border my-3">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 16px",
          // backgroundColor: "#f5f5f5",
        }}
        onClick={handleToggleSpring}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {item.icon}
            <Typography variant="body1">{item.title}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem", // Smaller font size
                fontWeight: 300, // Thinner font weight
                color: "gray", // Muted color
                borderRight: "1px solid #ccc", // Border left
                paddingRight: "8px", // Add padding to give spacing
                marginLeft: "8px", // Optional spacing between items
              }}
            >
              وسط هفته:
              <span style={{ marginInline: "4px" }}>
                {watch(`midWeek${item?.label}`) || 0}
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "gray",
                borderRight: "1px solid #ccc", // Border left
                paddingRight: "8px", // Add padding to give spacing
                marginLeft: "8px", // Optional spacing between items
              }}
            >
              آخر هفته:
              <span style={{ marginInline: "4px" }}>
                {watch(`endWeek${item?.label}`) || 0}
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "gray",
                // borderRight: "1px solid #ccc", // Border left
                paddingRight: "8px", // Add padding to give spacing
                marginLeft: "8px", // Optional spacing between items
              }}
            >
              ایام پیک
              <span style={{ marginInline: "4px" }}>
                {watch(`peakDays${item?.label}`) || 0}
              </span>
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={{ padding: "16px", backgroundColor: "#ffffff" }}>
          {/* وسط هفته */}
          <Box sx={{ mt: 0 }}>
            <InputeContainer label="وسط هفته">
              <Controller
                name={`midWeek${item?.label}`}
                control={control}
                rules={{
                  required: "وارد کردن مبلغ الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    dir="ltr"
                    fullWidth
                    size="small"
                    type="text"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    // label="وسط هفته"
                    value={field.value || ""}
                    onChange={(e) =>
                      handleInputChange(e, `midWeek${item?.label}`)
                    }
                    InputProps={{
                      onFocus: (e) => e.preventDefault(),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "gray" }}
                          >
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
            </InputeContainer>
          </Box>

          {/* آخر و تعطیلات هفته */}
          <Box sx={{ mt: 3 }}>
            <InputeContainer label="آخر هفته و تعطیلات عادی">
              <Controller
                name={`endWeek${item?.label}`}
                control={control}
                rules={{
                  required: "وارد کردن مبلغ الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    dir="ltr"
                    size="small"
                    type="text"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    // label="آخر هفته و تعطیلات عادی"
                    value={field.value || ""}
                    onChange={(e) =>
                      handleInputChange(e, `endWeek${item?.label}`)
                    }
                    InputProps={{
                      onFocus: (e) => e.preventDefault(),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "gray" }}
                          >
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
            </InputeContainer>
          </Box>

          {/* ایام پیک*/}
          <Box sx={{ mt: 3 }}>
            <InputeContainer label="ایام پیک">
              <Controller
                name={`peakDays${item?.label}`}
                control={control}
                rules={{
                  required: "وارد کردن مبلغ الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    dir="ltr"
                    fullWidth
                    size="small"
                    type="text"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    // label="ایام پیک"
                    value={field.value || ""}
                    onChange={(e) =>
                      handleInputChange(e, `peakDays${item?.label}`)
                    }
                    InputProps={{
                      onFocus: (e) => e.preventDefault(),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "gray" }}
                          >
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
            </InputeContainer>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FormSeasons;
