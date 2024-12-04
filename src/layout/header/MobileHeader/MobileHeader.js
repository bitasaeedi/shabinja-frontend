import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  InputBase,
  Avatar,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { styled, useTheme, alpha } from "@mui/system";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GridViewIcon from "@mui/icons-material/GridView";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import logo_with_name from "../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../../images/shabinja_logo_with_name_white.png";
import ModalLogin from "../../../components/Login/ModalLogin";
import CheckTokenExpiration from "../../../components/checkTokenExpiration/CheckTokenExpiration";
import RemoveStorageLogin from "../../../components/RemoveStorageLogin/RemoveStorageLogin";

// Styled components for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%", // Ensure it fills the container
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Ensure it takes up the full width
  border: "1px solid",
  borderColor: "#7777",
  borderRadius: 5,
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  boxShadow: `0px 4px 0px 0px ${theme.palette.primary.main}`, // Shadow only at the bottom
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: theme.spacing(2),
    transition: theme.transitions.create("width"),
  },
  cursor: "pointer",
}));

const MobileHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [userName, setUserName] = useState("کاربر شبینجا");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const theme = useTheme();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check login status and user name when the component mounts
    const checkLoginStatus = () => {
      CheckTokenExpiration(); // بررسی عتبار توکن
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsLogin(true);
        setUserName(localStorage.getItem("name") || "کاربر شبینجا"); // Fallback name if not set
      } else {
        setIsLogin(false);
        setUserName("کاربر شبینجا");
      }
    };

    // Initial check on mount
    checkLoginStatus();
  }, [localStorage.getItem("access_token")]);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    console.log("Search:", event.target.value);
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserName("کاربر شبینجا");
    RemoveStorageLogin();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box xs={{}} className=" w-100 ">
      <CssBaseline />
      <AppBar
        sx={{
          position: isSticky ? "fixed" : "static", // 'relative' keeps it inside the flow
          backgroundColor: isSticky ? "white" : "white",
          color: theme.palette.text.primary,
          // boxShadow: isSticky ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          width: "100%", // Ensure it takes full width
        }}
        component="nav"
      >
        <Toolbar>
          <Grid container spacing={0} className="pb-3 w-100">
            {/* Top Bar: Logo and User Section */}
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
                flexWrap: "nowrap",
                display: isSticky ? "none" : "flex",
              }}
            >
              {/* Logo Section */}
              <Grid
                item
                // xs="auto"
                sx={{ display: isSticky ? "none" : "flex", maxWidth: 215 }}
              >
                <Link
                  to="/"
                  className="w-100"
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    component="img"
                    src={logo_with_name}
                    alt="Shabinja Logo"
                    className="my-0 py-0 mt-3"
                    sx={{
                      maxWidth: 90,
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                  <Box className="my-0 py-0 pt-1">
                    <Typography variant="body2" sx={{ color: "#9999" }}>
                      اجاره ویلا، سوئیت و اقامتگاه در سراسر ایران
                    </Typography>
                  </Box>
                </Link>
              </Grid>

              {/* User Section */}
              <Grid item xs="auto">
                {isLogin ? (
                  <div>
                    <Button
                      size="small"
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="title"
                      disableElevation
                      onClick={handleClick}
                      startIcon={<AccountCircleIcon />}
                      endIcon={
                        <KeyboardArrowDownIcon
                          sx={{
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      }
                      sx={{
                        ml: { xs: 0, md: 0 },
                        px: { xs: 0, md: 0 },
                        fontSize: { xs: "0.8rem", md: "1rem" },
                        minWidth: "auto",
                        color: "primary.main",
                      }}
                    >
                      <Typography variant="body2">{userName}</Typography>
                    </Button>
                    {/* User Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "center",
                        vertical: "top",
                      }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      dense
                    >
                      <MenuItem onClick={handleClose}>
                        <GridViewIcon className="mx-1 text-muted" /> داشبورد
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <QuestionMarkIcon className="mx-1 text-muted" /> سوالات
                        متداول
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <PersonAddIcon className="mx-1 text-muted" /> دعوت از
                        دوستان
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <SettingsIcon className="mx-1 text-muted" /> تنظیمات
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        className="text-danger"
                        onClick={() => {
                          handleLogout();
                          handleClose();
                        }}
                      >
                        <LogoutIcon className="mx-1" /> خروج از حساب کاربری
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button
                    size="small"
                    variant="text"
                    startIcon={
                      <LoginIcon
                        fontSize="small"
                        sx={{ transform: "rotate(180deg)" }}
                      />
                    }
                    onClick={() => setOpenModalLogin(true)}
                    sx={{
                      ml: { xs: 1, md: 0 },
                      px: { xs: 0, md: 3 },
                      fontSize: { xs: "0.8rem", md: "1rem" },
                      minWidth: "auto",
                    }}
                    title=" ورود یا ثبت‌نام"
                  >
                    <Typography variant="body2">ورود یا ثبت‌نام</Typography>
                  </Button>
                )}
              </Grid>
            </Grid>

            {/* Search Bar */}
            <Grid item xs={12} className="w-100 mt-3">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="جستجو شهر، استان یا اقامتگاه"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchChange}
                />
              </Search>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {openModalLogin && (
        <ModalLogin
          open={openModalLogin}
          handleClose={() => setOpenModalLogin(false)}
        />
      )}
    </Box>
  );
};

export default MobileHeader;
