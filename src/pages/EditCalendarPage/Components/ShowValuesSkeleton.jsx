import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ShowValuesSkeleton = () => (
  <>
    {[1, 2].map((_, idx) => (
      <Box key={idx}
        sx={{
          my: 2,
          border: "1px solid #d1d1d1",
          borderRadius:"5px",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100px",
          height: "100px",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", gap: "7px", mb: 1 }}>
            <Skeleton variant="text" width={40} height={24} />
            <Skeleton variant="text" width={80} height={24} />
            <Skeleton variant="text" width={80} height={24} />
          </Box>
          {[1].map((_, i) => (
            <Box key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                my: 2,
              }}
            >
              <Skeleton variant="text" width={70} height={24} />
              <Skeleton variant="rectangular" width={100} height={32} />
            </Box>
          ))}
        </Box>
       
      </Box>
    ))}
  </>
);

export default ShowValuesSkeleton; 