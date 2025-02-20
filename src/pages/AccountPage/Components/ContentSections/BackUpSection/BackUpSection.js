import React, { useState } from "react";
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ManageSupport from "./Component/ManageSupport";
const BackUpSection = ({ anchor, isMobile , nameSection = "account" }) => {
  const [openDrawer, setOpenDrawer] = useState(anchor); // Manage drawer state
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/${nameSection}/menu`);
    setOpenDrawer(false);
  };

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={openDrawer}
      onClose={handleClose}
      onOpen={() => setOpenDrawer(true)}
      PaperProps={{
        sx: {
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0", // Rounded top corners
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0, // Ensure `top` is defined
          zIndex: 100,
          py: 0,
        }}
        className="d-flex justify-content-between w-100 px-2 align-items-center py-0 bg-white"
      >
        <Box>
          <Typography variant="h5" sx={{ fontSize: "16px" }}>
            ارسال پیام به پشتیبانی
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <ManageSupport />
    </SwipeableDrawer>
  ) : (
    <ManageSupport />
  );
};

export default BackUpSection;
