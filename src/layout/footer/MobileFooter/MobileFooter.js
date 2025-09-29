import React, { useContext, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
  Home,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DrawerComponent from "../../../components/drawer/DrawerComponent";
import { AppContext } from "../../../App";

const MobileFooter = () => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      label: "منو",
      icon: <MenuIcon fontSize="small" />,
      action: handleDrawerToggle,
      match: () => false, // هرگز فعال نیست
      color: "initial",
    },
    {
      label: "پشتیبانی",
      icon: <HeadsetMicOutlinedIcon fontSize="small" />,
      action: () => window.Goftino?.open?.(),
      match: () => location.pathname === "/support",
      color: "primary.main",
    },
    {
      label: "خانه",
      icon: <Home fontSize="small" />,
      action: () => navigate("/"),
      match: () => location.pathname === "/",
      color: "white",
      isElevated: true,
    },
    {
      label: "خانه", // برای فضای خالی
      icon: <Home fontSize="small" />,
      action: () => {},
      match: () => false,
      disabled: true,
      color: "white",
      unvisibilie: true,
    },
    {
      label: appContext?.userInfo?.userIsHost && appContext?.isLoginMain
        ? "پنل‌میزبان"
        : "میزبان شو",
      icon: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
      action: () =>
        navigate(
          appContext?.userInfo?.userIsHost && appContext?.isLoginMain
            ? "/pannel/menu"
            : "/new-stay/start"
        ),
      match: () => location.pathname.includes("/pannel"),
      color: "#287dfadb",
    },
    {
      label: appContext?.isLoginMain ? "پروفایل" : "ورود/ثبت‌نام",
      icon: <PersonOutlineOutlinedIcon fontSize="small" />,
      action: () => navigate("/account/menu"),
      match: () => location.pathname.includes("/account"),
      color: "#287dfadb",
    },
  ];

  // پیدا کردن آیتم فعال
  const selectedIndex = menuItems.findIndex((item) => item.match());

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          backgroundColor: "white",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          padding: ".3rem 0",
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0.3rem)",
        }}
      >
        <BottomNavigation
          showLabels
          value={selectedIndex}
          onChange={(event, newValue) => {
            menuItems[newValue]?.action();
          }}
          sx={{
            width: "100%",
            justifyContent: "space-around",
            padding: "0",
            position: "relative",
            // bgcolor:"black"
          }}
        >
          {menuItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.isElevated || item.isElevated ? "" : item.label}
              icon={item.unvisibilie ? null : item.icon}
              onClick={item.action}
              disabled={item.disabled}
              sx={{
              
                color:
                  item.unvisibilie || item.isElevated
                    ? "white"
                    : "rgb(163 163 163 / 87%)",
                zIndex: item.unvisibilie ? "0" : "1000",
                "&.Mui-selected": {
                  color: item.color,
                  fill: item.color,
                },
                "&.Mui-selected .MuiSvgIcon-root": {
                  color: item.color,
                  fill: item.color,
                },
                minWidth: 0,
                ".MuiBottomNavigationAction-label": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "0.7rem",
                  display: item?.isElevated?"none":"unset"
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.9rem",
                  fill: "rgb(163 163 163 / 87%)",
                },
                ...(item.isElevated && {
                  position: "absolute",
                  top: "-1.8rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#287dfa",
                  borderRadius: "50%",
                  padding: ".9rem",
                  zIndex: "10000 !important",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                    fontSize: "2.3rem",
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
