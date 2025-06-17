import React, { useState } from "react";
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "./Components/Requests";
import Profile from "./Components/Profile";
import FutureBooking from "./Components/FutureBooking";
import NewStay from "./Components/NewStay";
import { SearchOff } from "@mui/icons-material";

const Dashboard = ({ anchor, isMobile }) => {
  const [openDrawer, setOpenDrawer] = useState(anchor); // Manage drawer state
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/pannel/menu");
    setOpenDrawer(false);
  };

  const NoValueComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          py: 1,
          textAlign: "center",
          width:"100%"
        }}
      >
        <SearchOff sx={{ fontSize: 30, color: "#aaa", mb: 1 }} />
        <Typography variant="body" color="text.secondary" gutterBottom>
           درخواستی برای نمایش وجود ندارد
        </Typography>
      </Box>
    );
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
          height: "600px",
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
            داشبورد
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Profile isMobile={isMobile} />

        <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ fontSize: "16px", mb: 1 }}>
              درخواست ها
            </Typography>
          <Requests isMobile={isMobile}  NoValue={NoValueComponent}/>
        </Box>

        <Box sx={{ mt: 2 }}>
          <FutureBooking isMobile={isMobile}  NoValue={NoValueComponent} />
        </Box>
        <Box sx={{ my: 2 }}>
          <NewStay isMobile={isMobile} />
        </Box>
      
      </Box>
    </SwipeableDrawer>
  ) : (
    // Desktop
    <>
      <Typography variant="h6" sx={{ fontSize: "18px", mb: 1 }}>
        داشبورد
      </Typography>

      <Box className="shadow borde rounded" sx={{ padding: "2rem 2.5rem" }}>
        {/* row 1 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontSize: "16px", mb: 1 }}>
              درخواست ها
            </Typography>
            <Requests NoValue={NoValueComponent}/>
          </Box>

          <Profile />
        </Box>

        {/* row 2 */}
        <Box sx={{ mt: 6 }}>
          <FutureBooking NoValue={NoValueComponent}/>
        </Box>

        {/* row 3 */}
        <Box sx={{ mt: 6 }}>
          <NewStay />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
