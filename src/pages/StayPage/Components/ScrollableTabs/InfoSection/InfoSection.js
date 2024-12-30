import { Box, Typography } from "@mui/material";
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
const InfoSection = () => {
  return (
    <Box>
      <Typography variant="h6">مشخصات</Typography>
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
                fontSize: 30,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
              }}
            >
              دربست
            </Typography>
          </Box>
        </Box>
        {/*  متراز*/}
        <Box className="d-flex flex-column justify-content-center align-items-center">
          <Box>
            <StraightenIcon
              sx={{
                fontSize: 30,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
              }}
            >
              100 متر
            </Typography>
          </Box>
        </Box>
        <Box className="d-flex flex-column justify-content-center align-items-center">
          <Box>
            <MeetingRoomOutlinedIcon
              sx={{
                fontSize: 30,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
              }}
            >
              2 اتاق
            </Typography>
          </Box>
        </Box>
        <Box className="d-flex flex-column justify-content-center align-items-center">
          <Box>
            <GroupOutlinedIcon
              sx={{
                fontSize: 30,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
              }}
            >
              تا 8 مهمان
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
