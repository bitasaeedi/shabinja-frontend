import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Skeleton, IconButton } from "@mui/material";
import SelectCityOption from "./SelectCityOption";
import CloseIcon from "@mui/icons-material/Close";
const SelectCity = ({
  selectedCity,
  closePopup,
  objectOfLisDatas,
  loading,
  widthSize,
  disableOnoutClose = false,
}) => {
  const counterRef = useRef();

  useEffect(() => {
    // if (!disableOnoutClose) {
    const handleClickOutside = (event) => {
      if (counterRef.current && !counterRef.current.contains(event.target)) {
        closePopup(); // Close the popup if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // }
  }, [closePopup]);

  return (
    <Box
      ref={counterRef}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "18px 16px",
        width: widthSize ? widthSize : "250px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography className="m-2" sx={{ fontSize: "12px", color: "gray" }}>
          لیست اقامتگاه‌ها
        </Typography>

        <IconButton onClick={closePopup}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box>
        {loading ? (
          // Skeleton loading effect
          <Box>
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ marginBottom: "10px" }}
            />
          </Box>
        ) : (
          <>
            {objectOfLisDatas?.cities?.map((item, index) => (
              <SelectCityOption
                key={index}
                item={item}
                callBack={selectedCity}
              />
            ))}
            {objectOfLisDatas?.provinces?.map((item, index) => (
              <SelectCityOption
                key={index}
                item={item}
                callBack={selectedCity}
              />
            ))}
            {objectOfLisDatas?.otherConditions?.map((item, index) => (
              <SelectCityOption
                key={index}
                item={item}
                callBack={selectedCity}
              />
            ))}
            {objectOfLisDatas?.hosts?.map((item, index) => (
              <SelectCityOption
                key={index}
                item={item}
                callBack={selectedCity}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SelectCity;
