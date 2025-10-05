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
import React, { useEffect, useState, useCallback } from "react";
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
import { HostTourSearchApi } from "../../api/toureApis";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook'

// لیست منو موبایل

const drawerWidth = 240;

const DrawerComponent = ({ mobileOpen, handleDrawerToggle }) => {
  const [listTitleSliders, setListTitleSliders] = useState();
  const [openMenus, setOpenMenus] = useState({});
  const [subMenuDataExists, setSubMenuDataExists] = useState({});

  const handleToggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const menuItems = [
    {
      title: "لیست اقامتگاه ها",
      icon: <HomeIcon />,
      subMenu: listTitleSliders,
    },
    {
      title: "علاقه مندی ها",
      icon: <FavoriteIcon />,
      path: "/rules",
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
      title: "مجله",
      icon: <MenuBookIcon />,
      path: "/mag",
    },
    {
      title: "سوالات متداول",
      icon: <HelpOutlineIcon />,
      path: "/help",
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
      title: "قوانین و مقرارات",
      icon: <GavelIcon />,
      path: "/rules",
    },
   
  ];

  const setFilters = (url) => {
    let filters = {};
    if (url?.includes("?")) {
      const queryString = url.split("?")[1];
      const params = new URLSearchParams(queryString);

      params.forEach((value, key) => {
        filters[key] = isNaN(value) ? value : Number(value);
      });
    } else {
      return { title: url }; //like kurdestan
    }

    const filtersParams = {
      start: filters?.start,
      end: filters?.end,
      count: filters?.count,
      room: filters?.room,
      minprice: filters?.min,
      maxprice: filters?.max,
      skip: 0,
      take: 20,
      rolItemTour: filters?.rules?.split(",") || [],
      typeHost: filters?.typeHost?.split(",") || [],
      typeHostLoc: filters?.typeHostLoc?.split(",") || [],
      otherItemTour: filters?.features?.split(",") || [],
      rate: filters?.scores ? [filters?.scores] : [],
      province: filters?.province?.split(",") || [],
      city: filters?.cities?.split(",") || [],
      locations: [],
      // sort: filters?.sort,
    };
    // console.log("url : ", url, "pa", filtersParams);

    return filtersParams;
  };

  const checkListExist = useCallback(async (dataToFilter) => {
    const filterdData = setFilters(dataToFilter);
    const resultGetTours = await HostTourSearchApi(filterdData);
    var list = resultGetTours?.data?.items?.length ;
    // console.log("datafor fil", dataToFilter, "res", list);
    return list;
  }, []);

  const checkAllSubMenuItems = useCallback(async (subMenuItems) => {
    if (!subMenuItems || subMenuItems.length === 0) return {};
    
    const dataExists = {};
    const promises = subMenuItems.map(async (subItem, index) => {
      const count = await checkListExist(subItem?.urlTour);
      dataExists[`${subItem?.urlTour}`] = count > 0;
    });
    
    await Promise.all(promises);
    return dataExists;
  }, [checkListExist]);

  const getListTitleSliders = useCallback(async () => {
    const result = await GetListTitleSlidersApi();
    let list = result?.data || [];

    list = list?.sort((a, b) => a.order - b.order);
    const filteredList = list.map((item) => ({
      title: item.title,
      urlTour: item.urlTour,
    }));

    setListTitleSliders(filteredList);
    
    // Check which submenu items have data
    const dataExists = await checkAllSubMenuItems(filteredList);
    setSubMenuDataExists(dataExists);
    
    return filteredList;
  }, [checkAllSubMenuItems]);

  useEffect(() => {
    getListTitleSliders();
  }, [getListTitleSliders]);

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

          // Check if any submenu items have data
          const hasSubMenuWithData = hasSubMenu && 
            item.subMenu.some(subItem => subMenuDataExists[subItem?.urlTour]);

          // Don't render the menu item if it has submenu but no submenu items have data
          if (hasSubMenu && !hasSubMenuWithData) {
            return null;
          }

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
                    {item.subMenu.map((subItem, subIndex) =>
                      subMenuDataExists[subItem?.urlTour] ? (
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
                            sx={{ textAlign: "start", py: 0.5 }}
                            onClick={() => {
                              // Close the drawer when a submenu item is selected
                              handleDrawerToggle();
                            }}
                          >
                            <ListItemText
                              primary={`- ${subItem?.title}`}
                              primaryTypographyProps={{
                                fontSize: 14,
                                color: "gray",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ) : null
                    )}
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
