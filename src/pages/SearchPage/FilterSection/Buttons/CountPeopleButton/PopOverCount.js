import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const PopOverCount = ({ callBackFunc, defaultCount }) => {
  const [count, setCount] = useState(defaultCount || 0);
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
  }; // Prevent going below 1

  const handleFinall = (value) => {
    callBackFunc(value);
  };

  return (
    <Box
      ref={counterRef}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "18px 16px",
        width: "300px",
      }}
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
      <hr />
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            color: "black",
          }}
          variant="text"
          size="small"
          disabled={count < 1}
          onClick={() => handleFinall(null)}
        >
          حذف فیلتر
        </Button>
        <Button
          sx={{
            bgcolor: "black",
          }}
          variant="contained"
          size="small"
          disabled={count < 1}
          onClick={() => handleFinall(count)}
        >
          ثبت تعداد نفرات
        </Button>
      </Box>
    </Box>
  );
};

export default PopOverCount;
