import { Box, Typography, Skeleton, Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";

export const SpaceStay = () => {
  const stayPageContext = useContext(StayPageContext);

  // Check if data is still loading
  if (stayPageContext?.loading) {
    return (
      <Box>
        {/* <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="text" width={250} height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} /> */}
      </Box>
    );
  }

  const fontSizeText = 15;
  return (
    <Box>
      <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
      <Typography variant="h6">مشخصات اقامتگاه </Typography>
      <Grid container mt={2}>
        <Grid item xs="6" sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            ظرفیت استاندارد:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${stayPageContext?.infoOfStay?.minCapacity} نفر`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            حداکثر ظرفیت :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${stayPageContext?.infoOfStay?.maxCapacity} نفر`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            متراژ زیربنا :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${stayPageContext?.infoOfStay?.allSizeOfTheInfrastructure} متر`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            متراژ محوطه :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${stayPageContext?.infoOfStay?.sizeOfTheInfrastructure} متر`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            نوع اقامتگاه :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${stayPageContext?.infoOfStay?.typeHostDbTitle} `}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            منطقه :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${"جنگلی"} `}
          </Typography>
        </Grid>

        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            تخت یک نفره :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${"1"} تخت`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            تخت دونفره :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${"2"} تخت`}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            اتاق خواب : 
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${"2"} اتاق `}
          </Typography>
        </Grid>
        <Grid item xs="6" sx={{ display: "flex", mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
            }}
          >
            رختخواب سنتی (تشک):
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              ml: 1,
            }}
            color="textSecondary"
          >
            {`${"2"} عدد`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
