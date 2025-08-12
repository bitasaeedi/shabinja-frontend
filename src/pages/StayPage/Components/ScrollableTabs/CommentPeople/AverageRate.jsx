import { Box, LinearProgress, Rating, Typography } from "@mui/material";
import React from "react";

export default function AverageRate({ rates }) {
  const itemRate = [
    {
      title: "خدمات",
      rate: rates?.serviceall,
    },
    {
      title: "مکان",
      rate: rates?.placeall,
    },
    {
      title: "سرویس دوره ای",
      rate: rates?.servicelangall,
    },
    {
      title: "پاکیزگی",
      rate: rates?.cleanall,
    },
    {
      title: "امکانات رفاهی",
      rate: rates?.optionall,
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
          width: { xs: "100%", sm: "420px" },
          height: { xs: "150px", sm: "180px" },
          padding: "1rem",
          borderRadius: "8px",
          filter: "blur(2px)",
        }}
        className="border"
      >
        {/* right section */}
        <Box
          sx={{
            width: "38%",
            bgcolor: "#bdbdbd3e",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: ".6rem", sm: "1rem" },
          
          }}
        >
          
            <>
          <Typography variant="h6">
            <span>{rates.rate}</span> از 5
          </Typography>
          <Rating
            value={rates.rate }
            precision={".5"}
            readOnly
            sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}
          />
            </>
          
        </Box>

        {/* left section */}
        <Box
          width={"58%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {itemRate.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: ".78rem", sm: ".9rem" } }}
                >
                  {item.title}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item?.rate || 0}
                  sx={{
                    width: { xs: "45%", sm: "50%" },
                    height: { xs: "5px", sm: "6px" },
                    borderRadius: 5,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#faaf00",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
