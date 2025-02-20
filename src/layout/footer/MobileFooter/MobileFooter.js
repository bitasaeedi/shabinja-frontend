import React, { useContext, useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Home, AccountCircle, ShoppingBag } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DrawerComponent from "../../../components/drawer/DrawerComponent";
import { AppContext } from "../../../App";

const MobileFooter = () => {
  const appContext = useContext(AppContext);
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
      action: () => navigate("/account/support"),
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
      label:
        appContext?.userInfo?.userIsHost && appContext?.isLoginMain
          ? " پنل‌میزبان"
          : "میزبان شو",
      icon: <ShoppingBag fontSize="small" />,
      action: () =>
        navigate(
          appContext?.userInfo?.userIsHost && appContext?.isLoginMain
            ? "/pannel/menu"
            : "/new-stay/start"
        ),
      disabled: false,
      color: "primary.main",
    },
    {
      label: appContext?.isLoginMain ? "پروفایل" : "ورود/ثبت‌نام",
      icon: <AccountCircle fontSize="small" />,
      action: () => navigate("/account/menu"),
      disabled: false,
      color: "primary.main",
    },
  ];

  useEffect(() => {
    switch (true) {
      case location.pathname === "/support":
        setValue(1);
        break;
      case location.pathname === "/":
        setValue(2);
        break;
      case location.pathname.includes("/pannel"):
        setValue(3);
        break;
      case location.pathname.includes("/account"):
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
                ".MuiBottomNavigationAction-label": {
                  whiteSpace: "nowrap", // Prevent label from wrapping
                  overflow: "hidden", // Optional: Hide overflow if text exceeds space
                  textOverflow: "ellipsis", // Optional: Add ellipsis for overflowing text
                },
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
