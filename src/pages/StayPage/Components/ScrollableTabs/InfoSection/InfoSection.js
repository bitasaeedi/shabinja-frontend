import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { StayPageContext } from "../../../StayPage";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
//import SquareFootIcon from '@mui/icons-material/SquareFoot';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import { DownloadImageApi } from "../../../../../api/DownloadImageApi";

const InfoSection = () => {
  const stayPageContext = useContext(StayPageContext);
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    setBgImage(stayPageContext?.infoOfStay?.profileImage);
  }, [stayPageContext?.infoOfStay]);

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
          {/* <Skeleton variant="circular" width={50} height={50} /> */}
        </Box>

        {/* نوع اجاره */}
        <Box sx={{ mt: { xs: 1, md: 4 } }}>
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
            {` ${stayPageContext?.infoOfStay?.typeHostDbTitle} ${stayPageContext?.infoOfStay?.title} در ${stayPageContext?.infoOfStay?.address} به میزبانی ${stayPageContext?.infoOfStay?.fullName}`}
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 45,
            height: 45,
            mr:.5
          }}
          src={DownloadImageApi(bgImage)}
        ></Avatar>

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
                  fontSize: { xs: 20, md: 40 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 13 },
                }}
              >
                {stayPageContext?.infoOfStay?.typeHostDbTitle}
              </Typography>
            </Box>
          </Box>

          {/* متراز */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <AspectRatioIcon
                sx={{
                  fontSize: { xs: 20, md: 40 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 13 },
                }}
              >
                {stayPageContext?.infoOfStay?.sizeOfTheInfrastructure} متر
              </Typography>
            </Box>
          </Box>

          {/* اتاق */}
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box>
              <DoorBackOutlinedIcon
                sx={{
                  fontSize: { xs: 20, md: 40 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 13 },
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
                  fontSize: { xs: 20, md: 40 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 14, md: 13 },
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
