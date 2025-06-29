import React, { useContext, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Button,
  ListItemIcon,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveStorageLogin from "../../../../components/RemoveStorageLogin/RemoveStorageLogin";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { AppContext } from "../../../../App";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
const MenuSection = () => {
  const { section } = useParams();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const menuItems = [
    {
      label: "حساب کاربری",
      path: "profile",
      pannel: true,
      icon: <AccountCircleOutlinedIcon />,
    },
    {
      label: "رزرو‌ها",
      path: "reservations",
      pannel: true,
      icon: <EventNoteOutlinedIcon />, // Represents schedules or events
    },
    {
      label: "پسندها",
      path: "favorites/all",
      pannel: true,
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      label: "کیف پول",
      pannel: true,
      path: "wallet",
      icon: <WalletOutlinedIcon />,
    },
    {
      label: "سوالات متداول", // Help
      path: "help",
      pannel: false,
      icon: <HelpOutlineOutlinedIcon />,
    },
    // {
    //   label: "پشتیبانی",
    //   pannel: true,
    //   path: "support",
    //   icon: <HeadsetMicIcon />,
    // },
  ];

  const handleLogout = () => {
    appContext.setIsLoginMain(false);
    RemoveStorageLogin();
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: { xs: "relative", md: "sticky" },
        top: { xs: 0, md: 100 },
        maxWidth: { xs: "100%", md: 300 },
        backgroundColor: "background.paper",
        // borderRadius: "16px",
        overflow: "hidden",
        boxShadow: { xs: "none", md: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
        // border: { xs: "none", md: "1px solid #ccc" },
      }}
      className=" rounded"
    >
      {/* User Section */}
      <Box
        sx={{
          py: 3,
          backgroundColor: "eeeeee",
          color: "black",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          // position: "sticky",
          // top: 0,
        }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            // margin: "0 auto",
            background: "linear-gradient(135deg, #287dfa, #6a11cb)",
            fontSize: "1.5rem",
            color: "white",
            mx: 2,
          }}
          src={
            appContext?.userInfo?.imageUrl
              ? DownloadImageApi(appContext?.userInfo?.imageUrl)
              : ""
          }
        >
          {appContext?.userInfo?.name[0]}
        </Avatar>
        <Box
          sx={
            {
              // mx: 2,
            }
          }
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            {`${appContext?.userInfo?.name} ${appContext?.userInfo?.lastName}`}
          </Typography>
          <Typography variant="body2">داشبورد کاربری</Typography>
        </Box>
      </Box>

      {/* Menu List */}
      <List className="border-top">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            // to={`/account/${item.path}`}
            to={item?.pannel ? `/account/${item.path}` : `/${item.path}`}
            sx={{
              py: 1.5,
              px: 3,
              color: section === item.path ? "primary.main" : "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "primary.lighter",
                fontWeight: "bold",
              },
            }}
            selected={section ===  item.path.split("/")[0]}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color:
                  section ===  item.path.split("/")[0]? "primary.main" : "text.secondary",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        <ListItem
          button
          component={Button}
          onClick={handleLogout}
          // to={`/account/${item.path}`}
          sx={{
            py: 1.5,
            px: 3,
            color: "error.dark",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: "error.dark",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={" خروج از حساب کاربری"} />
        </ListItem>
      </List>
    </Box>
  );
};

export default MenuSection;
