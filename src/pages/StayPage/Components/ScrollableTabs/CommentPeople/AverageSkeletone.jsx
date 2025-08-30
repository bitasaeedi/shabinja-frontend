import { Box } from '@mui/material'
import React from 'react'

export default function AverageSkeletone() {
  return (
    <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // border: "1px solid gray",
              width: { xs: "100%", sm: "420px" },
              height: { xs: "150px", sm: "180px" },
              padding: "1rem",
              borderRadius: "8px",
            }}

            className="border"
          >
            {/* Right section skeleton */}
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
              <Box sx={{ width: "60px", height: "24px", bgcolor: "#e0e0e0", borderRadius: "4px" }} />
              <Box sx={{ width: "80px", height: "24px", bgcolor: "#e0e0e0", borderRadius: "4px" }} />
            </Box>

            {/* Left section skeleton */}
            <Box
              width={"58%"}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py:1
                  }}
                >
                  <Box sx={{ width: "100%", height: "6px", bgcolor: "#e0e0e0", borderRadius: "3px" }} />
                </Box>
              ))}
            </Box>
          </Box>
  )
}
