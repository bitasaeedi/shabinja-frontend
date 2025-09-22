import React, { useContext } from "react";
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
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveStorageLogin from "../../../../components/RemoveStorageLogin/RemoveStorageLogin";
import { AppContext } from "../../../../App";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
const MenuSection = () => {
  const { section } = useParams();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const menuItems = [
    {
      label: "داشبورد میزبان", // Host Dashboard
      path: "dashboard",
      pannel: true,
      icon: <DashboardOutlinedIcon />,
    },
    {
      label: "اقامتگاه‌ها", // Stays
      path: "stays",
      pannel: true,
      icon: <HomeOutlinedIcon />,
    },
    {
      label: "درخواست‌ها", // Requests
      path: "requests",
      pannel: true,
      icon: <MailOutlineOutlinedIcon />,
    },
    {
      label: "کیف پول", // Wallet
      path: "wallet",
      pannel: true,
      icon: <WalletOutlinedIcon />,
    },
    {
      label: "سوالات متداول", // Help
      path: "help",
      pannel: false,
      icon: <HelpOutlineOutlinedIcon />,
    },
    // {
    //   label: "پشتیبانی", // Support
    //   path: "support",
    //   pannel: true,
    //   icon: <SupportAgentOutlinedIcon />,
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
        // component={""}
        // to="/account/profile"
        sx={{
          py: 3,
          backgroundColor: "eeeeee",
          color: "black",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          textDecoration: "none",
          // position: "sticky",
          // top: 0,
        }}
      >
        <Avatar
          sx={{
            width: 65,
            height: 65,
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
            sx={{ fontWeight: "bold", fontSize: "19px" , marginTop: ".6rem" }}
          >
            {/* {appContext?.userInfo?.name} */}
            {`${appContext?.userInfo?.name} ${appContext?.userInfo?.lastName}`}
            {/* محمد محمدی */}
          </Typography>
          <Typography variant="body2">پنل میزبان</Typography>
        </Box>
      </Box>

      {/* Menu List */}
      <List className="border-top">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item?.pannel ? `/pannel/${item.path}` : `/${item.path}`}
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
              "& .MuiSvgIcon-root": {
                marginRight: ".8rem",
                fontSize: "1.75rem",
              },
            }}
            selected={section === item.path}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color:
                  section === item.path ? "primary.main" : "text.secondary",
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
