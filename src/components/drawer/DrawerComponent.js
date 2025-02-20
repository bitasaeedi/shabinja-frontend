import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GavelIcon from "@mui/icons-material/Gavel";
import HotelIcon from "@mui/icons-material/Hotel";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";
import logo_with_name from "../../images/shabinja_logo_with_name.png";
// لیست منو موبایل
const menuItems = [
  {
    title: "شیوه‌های پرداخت امن",
    icon: <PaymentIcon />,
    path: "/",
  },
  {
    title: "سوالات متداول",
    icon: <HelpOutlineIcon />,
    path: "/help",
  },
  {
    title: "قوانین و مقرارات",
    icon: <GavelIcon />,
    path: "/rules",
  },
  {
    title: "رزرو اقامتگاه",
    icon: <HotelIcon />,
    path: "/",
  },
  {
    title: "مجله شبینجا",
    icon: <ArticleIcon />,
    path: "/",
  },
  {
    title: "درباره ما",
    icon: <InfoIcon />,
    path: "/about",
  },
  {
    title: "تماس با ما",
    icon: <PhoneInTalkOutlinedIcon />,
    path: "/contact",
  },
];

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle }) => {
  // const { window } = props;

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  // منو که باز میشود در حالت موبایل
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <Link to="/">
          <Box
            component="img"
            src={logo_with_name}
            alt="Shabinja Logo"
            sx={{
              maxWidth: 80, // Controls the max width of the image
              width: "auto", // Ensures the width scales proportionally
              height: "auto", // Keeps the height proportional to the width
              objectFit: "contain", // Makes sure the image fits inside the container without distortion
              cursor: "pointer",
            }}
          />
        </Link>
      </Box>

      <Divider />
      {/* لیست منو ها در موبایل */}
      <List>
        {menuItems.map((item , index) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={item?.path}
            sx={{
              textDecoration: "none",
              color: "inherit",
              // mb: 1,
            }}
          >
            <ListItemButton sx={{ textAlign: "start" }}>
              <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText className="" sx={{}} primary={item.title} />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <nav>
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default DrawerComponent;
