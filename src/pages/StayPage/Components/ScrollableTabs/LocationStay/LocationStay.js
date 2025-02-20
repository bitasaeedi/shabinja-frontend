import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyMap from "../../../../../components/MyMap/MyMap";
import { StayPageContext } from "../../../StayPage";

const LocationStay = () => {
  const stayPageContext = useContext(StayPageContext);
  useEffect(() => {}, [stayPageContext.infoOfStay]);

  return (
    <Box>
      <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: 18, md: 20 },
        }}
      >
        نقشه
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: 14, md: 14 },
        }}
        color="textSecondary"
      >
        موقعیت مکانی دقیق ویلا پس از رزرو کامل ارسال خواهد شد.
      </Typography>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={"12"} sx={{ height: 300 }}>
          {stayPageContext?.infoOfStay?.loc ? (
            <MyMap
              points={[
                {
                  id: 1,
                  loc: stayPageContext?.infoOfStay?.loc,
                },
              ]}
              dragable={false}
              showSearch={false}
              zoomDefault={15}
              showArea={true}
              scrollWheelZoomBool={false}
              showPopup={false}
            />
          ) : (
            <>loading ...</>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationStay;
