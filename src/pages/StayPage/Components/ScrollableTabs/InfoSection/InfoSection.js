import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { StayPageContext } from "../../../StayPage";
const InfoSection = () => {
  const stayPageContext = useContext(StayPageContext);
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: 18, md: 20 },
        }}
      >
        مشخصات
      </Typography>
      <Box
        sx={{
          backgroundColor: "#e9e9e9",
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
              {/* دربست */}
            </Typography>
          </Box>
        </Box>
        {/*  متراز*/}
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
              {stayPageContext?.infoOfStay?.sizeOfTheInfrastructure}
              متر
              {/* 100 متر */}
            </Typography>
          </Box>
        </Box>
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
              تا{" "}
              {stayPageContext?.infoOfStay?.minCapacity +
                stayPageContext?.infoOfStay?.maxCapacity}{" "}
              مهمان
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
