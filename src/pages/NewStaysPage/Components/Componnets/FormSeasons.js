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
import { Controller, useWatch } from "react-hook-form";
import InputeContainer from "./InputeContainer";
import ToRial from "../../../../components/ToRial/ToRial";

const FormSeasons = ({ item, control, setValue }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSpring = () => {
    setIsOpen((prev) => !prev);
  };



  const handleInputChange = (e, field) => {
    const inputValue = e.target.value.replace(/,/g, "");
    if (isNaN(inputValue) && inputValue.length > 0) {
      field.onChange(ToRial(inputValue?.slice(0, -1)));
    } else {
      field.onChange(ToRial(inputValue));
    }


  };

  const midWeekValue = useWatch({
    control,
    name: `midWeek${item?.label}`,
  });

  const endWeekValue = useWatch({
    control,
    name: `endWeek${item?.label}`,
  });

  const peakDaysValue = useWatch({
    control,
    name: `peakDays${item?.label}`,
  });

  return (
    <Box className="shadow-sm border my-3">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 16px",
        }}
        onClick={handleToggleSpring}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {item.icon}
            <Typography variant="body1">{item.title}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "gray",
                borderRight: "1px solid #ccc",
                paddingRight: "8px",
                marginLeft: "8px",
              }}
            >
              وسط هفته:
              <span style={{ marginInline: "4px" }}>{midWeekValue || 0}</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "gray",
                borderRight: "1px solid #ccc",
                paddingRight: "8px",
                marginLeft: "8px",
              }}
            >
              آخر هفته:
              <span style={{ marginInline: "4px" }}>{endWeekValue || 0}</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "gray",
                paddingRight: "8px",
                marginLeft: "8px",
              }}
            >
              ایام پیک
              <span style={{ marginInline: "4px" }}>{peakDaysValue || 0}</span>
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={{ padding: "16px", backgroundColor: "#ffffff" }}>
          <Box sx={{ mt: 0 }}>
            <InputeContainer label="وسط هفته">
              <Controller
                name={`midWeek${item?.label}`}
                control={control}
                rules={{
                  value: /^\d*$/, // Only numbers are allowed
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange(e, field);
                    }}
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
                        fontSize: "0.8rem",
                        textAlign: "left",
                        direction: "rtl",
                      },
                    }}
                  />
                )}
              />
            </InputeContainer>
          </Box>

          <Box sx={{ mt: 3 }}>
            <InputeContainer label="آخر هفته و تعطیلات عادی">
              <Controller
                name={`endWeek${item?.label}`}
                control={control}
                rules={{
                  value: /^\d*$/, // Only numbers are allowed
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange(e, field);
                    }}
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
                        fontSize: "0.8rem",
                        textAlign: "left",
                        direction: "rtl",
                      },
                    }}
                  />
                )}
              />
            </InputeContainer>
          </Box>

          <Box sx={{ mt: 3 }}>
            <InputeContainer label="ایام پیک">
              <Controller
                name={`peakDays${item?.label}`}
                control={control}
                rules={{
                  value: /^\d*$/, // Only numbers are allowed
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
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange(e, field);
                    }}
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
                        fontSize: "0.8rem",
                        textAlign: "left",
                        direction: "rtl",
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
