import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Skeleton, IconButton } from "@mui/material";
import SelectCityOption from "./SelectCityOption";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../../App";
import { Link } from "react-router-dom";

const SelectCity = ({
  selectedCity,
  closePopup,
  objectOfLisDatas,
  loading,
  widthSize,
  disableOnoutClose = false,
}) => {
  const counterRef = useRef();
  const appContext = useContext(AppContext);

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
        width: widthSize ? widthSize : "280px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography className="m-2" sx={{ fontSize: "12px", color: "gray" }}>
          مقاصد محبوب
        </Typography>
        <IconButton onClick={closePopup}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {appContext?.favoritDestination?.map((city, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "10px",
              maxWidth: "150px",
              bgcolor: "#e9e9e9",
              borderRadius: "8px",
              padding: "8px",
              textAlign: "center",
            }}
          >
            {" "}
            <Box
              // to={`/search/${city?.urlTour}`}
              style={{
                textDecoration: "none",
                display: "block",
                width: "100%",
                color: "inherit",
                cursor: "pointer",
              }}
              // onClick={closePopup}
              onClick={() => {
                console.log("city", city);
                selectedCity({
                  ...city,
                  title: city?.title,
                  titleEn: city?.urlTour,
                });
              }}
              //  target="_blank"
            >
              <Typography sx={{ fontSize: 10 }}>{city?.title}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* مقاصدی که سرچ شده */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          className="m-2 mt-4"
          sx={{ fontSize: "12px", color: "gray" }}
        >
          لیست اقامتگاه‌ها
        </Typography>
      </Box>
      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
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
                isHost={true}
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
