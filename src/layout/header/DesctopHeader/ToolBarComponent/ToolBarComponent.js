import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GridViewIcon from "@mui/icons-material/GridView";
import logo_with_name from "../../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../.././../images/shabinja_logo_with_name_white.png";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { HostTourSearchTitleApi } from "../../../../api/toureApis";
import { useState } from "react";
import SelectCity from "../../../../components/popups/SelectCity/SelectCity";

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

const ToolBarComponent = ({ isSticky }) => {
  const appContext = useContext(AppContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [objectOfLisDatas, setObjectOfLisDatas] = useState([]);
  const [calendarAnchor, setCalendarAnchor] = useState(null);
  const [loadingSearchCitis, setLoadingSearchCitis] = useState(false);

  const open = Boolean(anchorEl);
  const theme = useTheme();

  React.useEffect(() => {
    const checkLoginStatus = () => {
      CheckTokenExpiration(); // بررسی عتبار توکن
      const token = localStorage.getItem("access_token");
      if (token) {
        appContext.setIsLoginMain(true);
      } else {
        appContext.setIsLoginMain(false);
      }
    };

    // Initial check on mount
    checkLoginStatus();
  }, [localStorage.getItem("access_token")]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    appContext.setIsLoginMain(false);
    setUserName("");
    RemoveStorageLogin();
    // localStorage.clear();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchCities = async (textToSearch) => {
    if (textToSearch.length >= 3 || textToSearch.length == 0) {
      setLoadingSearchCitis(true);
      const resultGetTours = await HostTourSearchTitleApi({
        title: textToSearch,
      });
      var objectList = resultGetTours?.data;
      setObjectOfLisDatas(objectList);
      setLoadingSearchCitis(false);
    }
  };

  const handleDateClick = (event, field) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleSelectCity = (selected) => {
    setCalendarAnchor(null);
    const url = `/search/${selected.titleEn}`;
    navigate(url);
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
          <Box>
            <Search onClick={(e) => handleDateClick(e, "city")}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="جستجو شهر، استان یا اقامتگاه "
                inputProps={{
                  "aria-label": "search",
                  onChange: (e) => handleSearchCities(e.target.value),
                }}
              />
            </Search>
            {calendarAnchor && (
              <Box
                sx={{
                  position: "absolute",
                  top: calendarAnchor.getBoundingClientRect().bottom + 20,
                  right: calendarAnchor.getBoundingClientRect().left,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  zIndex: 1000,
                  // width: "100%",

                  //   transform: `translate(${"50px"}, 0)`,
                }}
              >
                <SelectCity
                  closePopup={() => setCalendarAnchor(null)}
                  selectedCity={handleSelectCity}
                  objectOfLisDatas={objectOfLisDatas}
                  loading={loadingSearchCitis}
                  disableOnoutClose={true}
                  widthSize={"300px"}
                />
              </Box>
            )}
          </Box>
        </Box>
        {/* ------- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="پسندیده‌ها">
            <IconButton
              sx={{
                display: { xs: "none", md: "block" },
                color: isSticky ? "black" : "#ffffff",
              }}
              component={Link}
              to="/account/favorites"
            >
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* دکمه پشتیبانی */}
          <Tooltip title="پشتیبانی">
            <IconButton
              sx={{
                display: { xs: "none", md: "block" },
                color: isSticky ? "black" : "#ffffff",
                mx: 1,
              }}
              component={Link}
              to="/account/support"
            >
              <HeadsetMicIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Button
            component={Link}
            to={
              appContext?.userInfo?.userIsHost && appContext?.isLoginMain
                ? "/pannel/dashboard"
                : "/new-stay/start"
            }
            sx={{
              display: { xs: "none", md: "block" },
              mx: 1,
              color: isSticky ? "black" : "white",
            }}
            variant="text"
          >
            {appContext?.userInfo?.userIsHost && appContext?.isLoginMain
              ? " پنل میزبان"
              : "میزبان شو"}
          </Button>

          {appContext?.isLoginMain ? (
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
                  {appContext?.userInfo?.name || ""}
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
                {/* <Divider />
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    fontSize: 14,
                  }}
                  onClick={handleClose}
                  component={Link}
                  to="/help"
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
                </MenuItem> */}
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
