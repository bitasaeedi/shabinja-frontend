import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";

const SelectCity = ({ selectedCity, closePopup, listCitis, loading }) => {
  const counterRef = useRef();

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

  return (
    <Box
      ref={counterRef}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "18px 16px",
        width: "250px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
      }}
    >
      <Typography className="m-2" sx={{ fontSize: "12px", color: "gray" }}>
        لیست اقامتگاه‌ها
      </Typography>
      <Box>
        {loading ? (
          // Skeleton loading effect
          <Box>
            <Skeleton variant="text" width="100%" height={20} sx={{ marginBottom: "10px" }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ marginBottom: "10px" }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ marginBottom: "10px" }} />
          </Box>
        ) : (
          listCitis?.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                selectedCity(item?.title);
              }}
              className="cursor-pointer"
              sx={{
                padding: "8px 0",
                "&:hover": {
                  backgroundColor: "#e0e0e0", // Hover effect for better UX
                },
              }}
            >
              <Typography
                className="m-2"
                sx={{ fontSize: "14px", color: "gray" }}
              >
                {item?.title}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SelectCity;
