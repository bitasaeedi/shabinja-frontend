import { Box, Typography } from '@mui/material'
import React from 'react'

const FavoritCitiesCard = ({myData}) => {
  return (
    <div  className=" px-1">
    <Box
      sx={{
        width: "100%",
        height: 0,
        paddingBottom: "100%" /* Increased height, Aspect ratio 4:3 */,
        position: "relative",
        "@media (max-width: 1024px)": {
          paddingBottom: "100%" /* Taller ratio for smaller screens */,
        },
        "@media (max-width: 768px)": {
          paddingBottom: "100%" /* Taller ratio for smaller screens */,
        },
      }}
    >
      <img
        src={myData.image}
        alt={myData.name}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 5,
          objectFit: "cover", // Ensure image covers the box fully
        }}
      />
    </Box>
    <Typography
      variant="h6"
      className="mt-2 mb-2"
      sx={{
        fontSize: { xs: 14, sm: 16, md: 18 },
      }}
    >
      {myData.name}
    </Typography>
  </div>
  )
}

export default FavoritCitiesCard