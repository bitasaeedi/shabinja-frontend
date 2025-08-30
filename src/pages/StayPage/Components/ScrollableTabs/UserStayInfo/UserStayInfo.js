import { Avatar, Box,  Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { StayPageContext } from "../../../StayPage";
import { DownloadImageApi } from "../../../../../api/DownloadImageApi";

const UserStayInfo = () => {
  const [bgImage,setBgImage]=useState();
  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    setBgImage(stayPageContext?.infoOfStay?.profileImage)
  }, [stayPageContext?.infoOfStay]);

  console.log("my info",stayPageContext?.infoOfStay );
  
  return (
    <Box>
      {/* <Divider sx={{ my: 2, bgcolor: "#ddd" }} /> */}

      {/* <Box sx={{ display: "flex", alignItems: "center", mt: 4.5 }}>

        <Avatar
          sx={{
            width: 40,
            height: 40,
          }}
          src={DownloadImageApi(bgImage)}
        >
          
        </Avatar>
        
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: 16, md: 18 },
            mx: 1,
          }}
        >
          {stayPageContext?.infoOfStay?.fullName}
        </Typography>
      </Box> */}

      {/* <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs="12" sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <StarBorderRoundedIcon sx={{ fontSize: 25 }} />{" "}
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: 16, md: 16 },
              }}
            >
              {`میانگین ${4.6}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: 13, md: 13 },
              }}
              color="textSecondary"
            >
              {`از ${5} امتیاز`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs="12" sx={{}}>
          <Divider sx={{ my: 2, bgcolor: "#ddd", width: "100%" }} />
        </Grid>
        <Grid item xs="12" sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <SmsOutlinedIcon sx={{ fontSize: 25 }} />{" "}
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: 16, md: 16 },
              }}
            >
              {`${308} نظر `}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: 13, md: 13 },
              }}
              color="textSecondary"
            >
              {`از ${555} رزرو موفق`}
            </Typography>
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default UserStayInfo;
