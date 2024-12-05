import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme, alpha } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DrawerComponent from "../../../components/drawer/DrawerComponent";
import ModalLogin from "../../../components/Login/ModalLogin";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckTokenExpiration from "../../../components/checkTokenExpiration/CheckTokenExpiration";
import RemoveStorageLogin from "../../../components/RemoveStorageLogin/RemoveStorageLogin";
import LoginIcon from "@mui/icons-material/Login";
import {
  Avatar,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GridViewIcon from "@mui/icons-material/GridView";
import logo_with_name from "../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../../images/shabinja_logo_with_name_white.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation
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
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  left: 0, // Move the icon to the right
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer", // Ensures the cursor changes to a pointer
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "1px solid", // Adds a solid border
  borderColor: "#7777", // Corrected the color value
  borderRadius: 5,
  paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Adds space for the icon on the right
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: theme.spacing(2), // Adjust left padding
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "26ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
  cursor: "pointer", // Ensures the cursor changes to a pointer
}));

const DesctopHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [userName, setUserName] = React.useState("کاربر شبینجا");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Set sticky when scrolled beyond 50% of the viewport height
      setIsSticky(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (location.pathname != "/") {
      setIsSticky(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
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
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    console.log("Search:", event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserName("کاربر شبینجا"); // Reset to default name
    RemoveStorageLogin();
    // localStorage.clear();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: isSticky ? "white" : "transparent",
          color: theme.palette.text.primary,
          // boxShadow: "none",
          boxShadow: isSticky ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none", // Added shadow here
        }}
        component="nav"
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ mr: 2, display: { md: "none" } }}>
            <IconButton
              sx={{ color: isSticky ? "inherit" : "white" }} // Set the color to white
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              m: 0,
              p: 0,
            }}
          >
            <Box
              // className="bg-danger"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Link to="/">
                <Box
                  component="img"
                  src={isSticky ? logo_with_name : logo_with_name_white}
                  alt="Shabinja Logo"
                  sx={{
                    maxWidth: 120, // Controls the max width of the image
                    width: "auto", // Ensures the width scales proportionally
                    height: "auto", // Keeps the height proportional to the width
                    objectFit: "contain", // Makes sure the image fits inside the container without distortion
                    cursor: "pointer",
                  }}
                />
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: isSticky ? "flex" : "none", //{ xs: "flex", md: "none" },
              justifyContent: "center", // Centers horizontally
              alignItems: "center", // Centers vertically
              height: "auto",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="جستجو شهر، استان یا اقامتگاه "
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </Search>
          </Box>
          {/* ------- */}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              sx={{
                display: { xs: "none", md: "block" },
                color: isSticky ? "black" : "#ffffff",
              }}
              variant="text"
              startIcon={<FavoriteBorderIcon />}
              title="پسندیده‌ها"
            ></Button>
            <Button
              sx={{
                display: { xs: "none", md: "block" },
                color: isSticky ? "black" : "#ffffff",
              }}
              variant="text"
              startIcon={<HeadsetMicIcon />}
              title="پشتیبانی"
            ></Button>

            <Button
              sx={{
                display: { xs: "none", md: "block" },
                mx: 1,
                color: isSticky ? "black" : "white",
              }}
              variant="text"
            >
              پنل میزبان
            </Button>

            {isLogin ? (
              <div>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
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
                    ml: { xs: 2, md: 0 },
                    px: { xs: 1, md: 3 },
                    fontSize: { xs: "0.8rem", md: "1rem" },
                    minWidth: "auto",
                  }}
                  size="large"
                >
                  <Typography
                    variant="body2"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {userName}
                  </Typography>
                </Button>
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
                        fontSize: 12,
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                          fontSize: 12,
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
                          fontSize: 12,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "center", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  dense
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onClick={handleClose}
                  >
                    <GridViewIcon className="mx-1 text-muted " />
                    داشبورد
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onClick={handleClose}
                  >
                    <QuestionMarkIcon className="mx-1 text-muted " />
                    سوالات متداول
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onClick={handleClose}
                  >
                    <PersonAddIcon className="mx-1 text-muted " />
                    دعوت از دوستان
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    onClick={handleClose}
                  >
                    <SettingsIcon className="mx-1 text-muted " />
                    تنظیمات
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                    }}
                    className="text-danger"
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    <LogoutIcon className="mx-1  " />
                    خروج از حساب کاربری
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                variant="contained"
                startIcon={
                  <LoginIcon
                    // fontSize="small"
                    sx={{
                      transform: "rotate(180deg)",
                    }}
                  />
                }
                onClick={() => setOpenModalLogin(true)}
                sx={{
                  ml: { xs: 2, md: 0 },
                  px: { xs: 1, md: 3 },
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  minWidth: "auto",
                }}
                title=" ورود یا ثبت‌نام"
                size="large"
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "inline" },
                  }}
                >
                  ورود یا ثبت‌نام
                </Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <DrawerComponent
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      {openModalLogin && (
        <ModalLogin
          open={openModalLogin}
          handleClose={() => setOpenModalLogin(false)}
        />
      )}
    </>
  );
};

export default DesctopHeader;
