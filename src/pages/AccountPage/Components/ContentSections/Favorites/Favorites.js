import React, { useState } from "react";
import { Box, IconButton, SwipeableDrawer, Typography, useMediaQuery } from "@mui/material";
import ManageFavorites from "./Components/ManageFavorites";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const Profile = ({ anchor, isMobile }) => {
  const [openDrawer, setOpenDrawer] = useState(anchor); // Manage drawer state
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/account/menu");
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
          py: 1,
        }}
        className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
      >
        <Box>
          <Typography variant="h5" sx={{ fontSize: "16px" }}>
            پسندها
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <ManageFavorites />
    </SwipeableDrawer>
  ) : (
    <ManageFavorites />
  );
};

export default Profile;
