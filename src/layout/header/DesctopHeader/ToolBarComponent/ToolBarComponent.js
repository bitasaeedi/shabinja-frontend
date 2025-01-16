import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GridViewIcon from "@mui/icons-material/GridView";
import logo_with_name from "../../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../.././../images/shabinja_logo_with_name_white.png";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../../../../App";
import ModalLogin from "../../../../components/Login/ModalLogin";

import InputBase from "@mui/material/InputBase";
import { styled, useTheme, alpha } from "@mui/system";
import RemoveStorageLogin from "../../../../components/RemoveStorageLogin/RemoveStorageLogin";
import CheckTokenExpiration from "../../../../components/checkTokenExpiration/CheckTokenExpiration";

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

const ToolBarComponent = ({isSticky}) => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const [userName, setUserName] = React.useState("کاربر شبینجا");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  React.useEffect(() => {
    // Check login status and user name when the component mounts
    const checkLoginStatus = () => {
      CheckTokenExpiration(); // بررسی عتبار توکن
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsLogin(true);
        appContext.setIsLoginMain(true);
        setUserName(localStorage.getItem("name") || "کاربر شبینجا"); // Fallback name if not set
      } else {
        setIsLogin(false);
        appContext.setIsLoginMain(false);
        setUserName("کاربر شبینجا");
      }
    };

    // Initial check on mount
    checkLoginStatus();
  }, [localStorage.getItem("access_token")]);

  const handleSearchChange = (event) => {
    console.log("Search:", event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLogin(false);
    appContext.setIsLoginMain(false);
    setUserName("کاربر شبینجا"); // Reset to default name
    RemoveStorageLogin();
    // localStorage.clear();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
            component={Link}
            to="/pannel/dashboard"
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

                  minWidth: "auto",
                }}
                size="large"
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    fontSize: { xs: "16px", md: "17px" },
                  }}
                  className="py-0 px-0 my-0"
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
                      fontSize: 16,
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
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                dense
              >
                <MenuItem
                  component={Link}
                  to="/account/profile"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 14,
                  }}
                  onClick={handleClose}
                >
                  <GridViewIcon
                    sx={{
                      fontSize: 20,
                    }}
                    className="mx-1 text-muted "
                  />
                  داشبورد
                </MenuItem>
                <Divider />
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 14,
                  }}
                  onClick={handleClose}
                >
                  <QuestionMarkIcon
                    sx={{
                      fontSize: 20,
                    }}
                    className="mx-1 text-muted "
                  />
                  سوالات متداول
                </MenuItem>
                <Divider />
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 16,
                  }}
                  onClick={handleClose}
                >
                  <PersonAddIcon
                    sx={{
                      fontSize: 20,
                    }}
                    className="mx-1 text-muted "
                  />
                  دعوت از دوستان
                </MenuItem>
                <Divider />
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 16,
                  }}
                  onClick={handleClose}
                >
                  <SettingsIcon
                    sx={{
                      fontSize: 20,
                    }}
                    className="mx-1 text-muted "
                  />
                  تنظیمات
                </MenuItem>
                <Divider />
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 16,
                  }}
                  className="text-danger"
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <LogoutIcon
                    sx={{
                      fontSize: 20,
                    }}
                    className="mx-1  "
                  />
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
                    fontSize: 16,
                  }}
                />
              }
              onClick={() => setOpenModalLogin(true)}
              sx={{
                ml: { xs: 2, md: 0 },
                minWidth: "auto",
              }}
              title=" ورود یا ثبت‌نام"
              size="large"
            >
              <Typography
                variant="body2"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  fontSize: { xs: "16px", md: "17px" },
                }}
                className="py-0 px-0 my-0"
              >
                ورود یا ثبت‌نام
              </Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
      {openModalLogin && (
        <ModalLogin
          open={openModalLogin}
          handleClose={() => setOpenModalLogin(false)}
        />
      )}
    </>
  );
};

export default ToolBarComponent;
