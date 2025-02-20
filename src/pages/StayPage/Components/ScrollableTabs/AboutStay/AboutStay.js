import { Box, Typography, Skeleton } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";

export const AboutStay = () => {
  const stayPageContext = useContext(StayPageContext);

  // Check if data is still loading
  if (stayPageContext?.loading) {
    return (
      <Box>
        <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="text" width={250} height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">درباره اقامتگاه</Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 14,
          mt: 1,
        }}
      >
        {stayPageContext?.infoOfStay?.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: 14, md: 16 },
          textAlign: "justify",
        }}
      >
        {stayPageContext?.infoOfStay?.dics}
      </Typography>
    </Box>
  );
};
