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
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// لیست منو موبایل
const menuItems = [
  {
    title: "ورود/ ثبت‌ نام",
    icon: <AccountCircleIcon />,
  },
  {
    title: "پنل میزبان",
    icon: <MenuIcon />,
  },
  {
    title: "پشتیبانی",
    icon: <MenuIcon />,
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
      <Typography variant="h6" sx={{ my: 2 }} color="primary">
        شبینجا
      </Typography>
      <Divider />
      {/* لیست منو ها در موبایل */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "start" }}>
              <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText className="" sx={{}} primary={item.title} />
            </ListItemButton>
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
