import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { useContext } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { StayPageContext } from "../../../StayPage";

const InfoSection = () => {
  const stayPageContext = useContext(StayPageContext);

  // Check if data is still loading
  if (stayPageContext?.loading) {
    return (
      <Box>
        {/* میزبان */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" width={200} height={30} />
            <Skeleton variant="text" width={250} height={20} sx={{ mt: 1 }} />
          </Box>
          <Skeleton variant="circular" width={50} height={50} />
        </Box>

        {/* نوع اجاره */}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              backgroundColor: "#eeeeee",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              py: 2,
            }}
            className="rounded"
          >
            {/* Type of Rent */}
            <Box className="d-flex flex-column justify-content-center align-items-center">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
            </Box>

            {/* Size */}
            <Box className="d-flex flex-column justify-content-center align-items-center">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
            </Box>

            {/* Rooms */}
            <Box className="d-flex flex-column justify-content-center align-items-center">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
            </Box>

            {/* Capacity */}
            <Box className="d-flex flex-column justify-content-center align-items-center">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width={100} height={20} sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* میزبان */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 18, md: 20 },
            }}
          >
            {stayPageContext?.infoOfStay?.typeHostDbTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: 14, md: 16 },
            }}
          >
            {` اجاره ${stayPageContext?.infoOfStay?.typeHostDbTitle} در ${stayPageContext?.infoOfStay?.address} به میزبانی ${stayPageContext?.infoOfStay?.title}`}
          </Typography>
        </Box>
        <Box>
          <Avatar
            sx={{
              width: 50,
              height: 50,
            }}
          >
            ی
          </Avatar>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundColor: "#eeeeee",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            py: 2,
          }}
          className="rounded"
        >
          {/* نوع اجاره */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <HomeOutlinedIcon
                sx={{
                  fontSize: { xs: 20, md: 30 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {stayPageContext?.infoOfStay?.typeHostDbTitle}
              </Typography>
            </Box>
          </Box>

          {/* متراز */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <StraightenIcon
                sx={{
                  fontSize: { xs: 20, md: 30 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {stayPageContext?.infoOfStay?.sizeOfTheInfrastructure} متر
              </Typography>
            </Box>
          </Box>

          {/* اتاق */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <MeetingRoomOutlinedIcon
                sx={{
                  fontSize: { xs: 20, md: 30 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {stayPageContext?.infoOfStay?.room} اتاق
              </Typography>
            </Box>
          </Box>

          {/* مهمان */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <GroupOutlinedIcon
                sx={{
                  fontSize: { xs: 20, md: 30 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {/* stayPageContext?.infoOfStay?.minCapacity + */}
                تا {stayPageContext?.infoOfStay?.maxCapacity} مهمان
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
