import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Home, AccountCircle, ShoppingBag } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DrawerComponent from "../../../components/drawer/DrawerComponent";

const MobileFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    menuItems[newValue]?.action(); // Call the corresponding action
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Toggle the drawer open/close
  };

  // Menu button configuration
  const menuItems = [
    {
      label: "منو",
      icon: <MenuIcon fontSize="small" />,
      action: handleDrawerToggle,
      // disabled: true, // No navigation for this button
      color: "initial",
    },
    {
      label: "پشتیبانی",
      icon: <HeadsetMicIcon fontSize="small" />,
      action: () => navigate("/support"),
      disabled: false,
      color: "primary.main",
    },
    {
      label: "خانه",
      icon: <Home fontSize="small" />,
      action: () => navigate("/"),
      disabled: false,
      color: "primary.main",
    },
    {
      label: "پنل‌میزبان",
      icon: <ShoppingBag fontSize="small" />,
      action: () => navigate("/pannel"),
      disabled: false,
      color: "primary.main",
    },
    {
      label: "پروفایل",
      icon: <AccountCircle fontSize="small" />,
      action: () => navigate("/profile"),
      disabled: false,
      color: "primary.main",
    },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/support":
        setValue(1);
        break;
      case "/":
        setValue(2);
        break;
      case "/pannel":
        setValue(3);
        break;
      case "/profile":
        setValue(4);
        break;
      default:
        setValue(-1);
    }
  }, [location.pathname, mobileOpen]);

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}
          sx={{
            width: "100%",
            justifyContent: "space-around",
            padding: "0", // Reduce padding to save space
          }}
        >
          {menuItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={item.action} // Use action from configuration
              disabled={item.disabled} // Prevent navigation on disabled
              sx={{
                "&.Mui-selected": { color: item.color }, // Customize selected color
                minWidth: 0, // Prevent stretching
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
      {/* Drawer Component */}
      <DrawerComponent
        mobileOpen={mobileOpen} // Pass the mobileOpen state to the DrawerComponent
        handleDrawerToggle={handleDrawerToggle} // Pass the toggle function to close/open drawer
      />
    </>
  );
};

export default MobileFooter;
