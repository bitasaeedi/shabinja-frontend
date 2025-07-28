import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const PeopleCounter = ({ onValueChange, closePopup, defaultCount }) => {
  const [count, setCount] = useState(defaultCount || 0);
  const counterRef = useRef();

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (counterRef.current && !counterRef.current.contains(event.target)) {
        closePopup(); // Close the popup if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onValueChange(newCount); // Send value to parent
  };

  const decrement = () => {
    const newCount = Math.max(1, count - 1);
    setCount(newCount);
    onValueChange(newCount); // Send value to parent
  };

  const handleCountChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setCount(newValue);
      onValueChange(newValue);
    }
  };

  return (
    <Box
      ref={counterRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "18px 16px",
        width: "250px",
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
            fontSize: 20,
            minWidth: "30px",
            height: "30px",
            borderRadius: "10%",
            padding: 0,
            borderColor: "#000",
          }}
        >
          +
        </Button>

        {/* Count TextField */}
        <TextField
          value={count}
          onChange={handleCountChange}
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
            fontSize: 20,
            minWidth: "30px",
            height: "30px",
            borderRadius: "10%",
            padding: 0,
            borderColor: "#000",
          }}
        >
          -
        </Button>
      </Box>
    </Box>
  );
};

export default PeopleCounter;
