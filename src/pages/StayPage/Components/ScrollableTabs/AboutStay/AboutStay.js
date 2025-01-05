import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";

export const AboutStay = () => {
  const stayPageContext = useContext(StayPageContext);
  return (
    <Box>
      <Typography variant="h6">توضیحات اقامتگاه </Typography>
      {/* <Typography
        variant="h6"
        sx={{
          fontSize: 16,
        }}
      >
        این اقامتگاه در جنت آباد تهران واقع شده است.
      </Typography> */}
      <Typography
        variant="h6"
        sx={{
          fontSize: 16,
          textAlign: "justify",
        }}
      >
        {stayPageContext?.infoOfStay?.dics}
      </Typography>
    </Box>
  );
};
