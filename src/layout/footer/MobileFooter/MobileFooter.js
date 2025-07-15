import React, { useContext, useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
  Home,
  AccountCircle,
  ShoppingBag,
  Visibility,
} from "@mui/icons-material";
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

  const menuItems = [
    {
      label: "منو",
      icon: <MenuIcon fontSize="small" />,
      action: handleDrawerToggle,
      color: "initial",
    },
    {
      label: "پشتیبانی",
      icon: <HeadsetMicIcon fontSize="small" />,
      action: () => {
        window.Goftino.open();
      },
      disabled: false,
      color: "primary.main",
    },
    {
      label: "خانه",
      icon: <Home fontSize="small" />,
      action: () => navigate("/"),
      disabled: false,
      color: "white",
      isElevated: true,
    },
    {
      label: "خانه",
      icon: <Home fontSize="small" />,
      action: () => navigate("/"),
      disabled: true,
      color: "white",
      unvisibilie: true,
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
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#1f1f1f",
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
            padding: "0",
            position: "relative",
          }}
        >
          {menuItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.isElevated ? "" : item.label}
              icon={item.icon}
              onClick={item.action}
              disabled={item.disabled}
              sx={{
                color:
                  item.unvisibilie || item.isElevated
                    ? "white"
                    : "rgba(0, 0, 0, 0.6)",
                zIndex: item.unvisibilie ? "0" : "1000",
                "&.Mui-selected": { color: item.color },
                minWidth: 0,
                ".MuiBottomNavigationAction-label": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                ...(item.isElevated && {
                  position: "absolute",
                  top: "-2.3rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#287dfa", 
                  borderRadius: "50%",
                  padding: "1rem",
                  zIndex: "10000 !important",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: "4px solid rgba(255,255,255,0.8)",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                    fontSize: "1.8rem",
                  },
                }),
              }}
            />
          ))}
        </BottomNavigation>
      </Box>

      <DrawerComponent
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
};

export default MobileFooter;
