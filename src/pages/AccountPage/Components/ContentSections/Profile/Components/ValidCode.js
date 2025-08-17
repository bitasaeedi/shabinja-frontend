import React, { useState, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import { checkValidCode } from "../../../../../../api/Users.api";

export default function ValidCode({
  number,
  handleManageAlert,
  handleShowCode,
}) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // فقط اعداد
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value) {
      if (index < 4) {
        // حرکت به خانه بعدی
        inputsRef.current[index + 1].focus();
      } else {
        // اگر آخرین خانه بود و همه پر شدن، فوکوس برداشته شود
        const isAllFilled = newOtp.every((digit) => digit !== "");
        if (isAllFilled) {
          inputsRef.current[index].blur(); // برداشتن فوکوس
        }
      }
    }
  };
  

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // برگشت به خانه قبلی
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length === 5) {
      try {
        const result = await checkValidCode(number, code);
        console.log(result, "check");

        if (result?.issuccess) {
          handleManageAlert(true, "success", result?.message);
        } else {
          handleManageAlert(true, "error", result?.message);
        }
      } catch (error) {
        console.error("Error checking validation code:", error);
        handleManageAlert(true, "error", "خطا در بررسی کد");
      } finally {
        handleShowCode(false);
      }
    } else {
      alert("کد کامل نیست!");
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box display="flex" gap={.5} sx={{ direction: "rtl" }}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            inputRef={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: ".9rem",
                padding: "6px 4px",
                border: "none",       // خط دور داخلی حذف شد
                outline: "none",  
                borderBottom:"1px solid gray"    // خط دور هنگام focus حذف شد
              },
            }}
            sx={{
              width: 23,
              height: 25,
              border: "none",         // Border دور TextField حذف شد
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },           // خط پایه حذف
                "&:hover fieldset": { border: "none" },     // خط hover حذف
                "&.Mui-focused fieldset": { border: "none" } // خط focus حذف
              }
            }}
          />
        ))}
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        تایید
      </Button>
    </Box>
  );
}
