import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GavelIcon from "@mui/icons-material/Gavel";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import InfoIcon from "@mui/icons-material/Info";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import logo_with_name from "../../images/shabinja_logo_with_name.png";
import { GetListTitleSlidersApi } from "../../api/PublicApis";
import HomeIcon from "@mui/icons-material/Home";

// لیست منو موبایل

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle }) => {
  const [listTitleSliders, setListTitleSliders] = useState();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const menuItems = [
    {
      title: "قوانین و مقرارات",
      icon: <GavelIcon />,
      path: "/rules",
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
    {
      title: "میزبان شو",
      icon: <AddBusinessIcon />,
      path: "/new-stay/start",
    },
    {
      title: "درخواست وام",
      icon: <LocalAtmIcon />,
      path: "/loan",
    },
    {
      title: "سوالات متداول",
      icon: <HelpOutlineIcon />,
      path: "/help",
    },
    {
      title: "لیست اقامتگاه ها",
      icon: <HomeIcon />,
      subMenu: listTitleSliders,
    },
  ];

  const getListTitleSliders = async () => {
    const result = await GetListTitleSlidersApi();
    let list = result?.data || [];

    list = list?.sort((a, b) => a.order - b.order);
    const filteredList = list.map((item) => ({
      title: item.title,
      urlTour: item.urlTour,
    }));

    setListTitleSliders(filteredList);
    return filteredList;
  };

  useEffect(() => {
    getListTitleSliders();
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <Link to="/">
          <Box
            component="img"
            src={logo_with_name}
            alt="Shabinja Logo"
            sx={{
              maxWidth: 95,
              width: "auto",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
              my: 1,
            }}
          />
        </Link>
      </Box>

      <Divider />
      {/* لیست منو ها در موبایل */}
      <List>
        {menuItems.map((item, index) => {
          const hasSubMenu =
            Array.isArray(item.subMenu) && item.subMenu.length > 0;
          const isOpen = !!openMenus[index];

          return (
            <React.Fragment key={index}>
              <ListItem
                disablePadding
                component={hasSubMenu ? "div" : Link}
                to={hasSubMenu ? undefined : item?.path}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemButton
                  sx={{ textAlign: "start" }}
                  onClick={(e) => {
                    // Prevent closing the drawer when toggling submenu
                    e.stopPropagation();
                    if (hasSubMenu) {
                      handleToggleMenu(index);
                    } else {
                      // Let outer Box handle close on navigation
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText className="" sx={{}} primary={item.title} />
                  {hasSubMenu ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItemButton>
              </ListItem>

              {hasSubMenu ? (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem, subIndex) => (
                      <ListItem
                        key={`${index}-${subIndex}`}
                        disablePadding
                        component={Link}
                        to={`/search/${subItem?.urlTour}`}
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          pl: 4,
                        }}
                      >
                        <ListItemButton
                          sx={{ textAlign: "start" , py:.5 }}
                          onClick={() => {
                            // Close the drawer when a submenu item is selected
                            handleDrawerToggle();
                          }}
                        >
                          <ListItemText
                            primary={`- ${subItem?.title}`}
                            primaryTypographyProps={{ fontSize: 14, color: "gray" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              ) : null}

              {/* <Divider /> */}
            </React.Fragment>
          );
        })}
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
