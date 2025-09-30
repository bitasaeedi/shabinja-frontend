import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewIcon from "@mui/icons-material/GridView";
import logo_with_name from "../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../../images/shabinja_logo_with_name_white.png";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../../../App";

import InputBase from "@mui/material/InputBase";
import { styled, useTheme, alpha } from "@mui/system";
import RemoveStorageLogin from "../../../components/RemoveStorageLogin/RemoveStorageLogin";
import CheckTokenExpiration from "../../../components/checkTokenExpiration/CheckTokenExpiration";
import { HostTourSearchTitleApi } from "../../../api/toureApis";
import { useState } from "react";
//   import SelectCity from "../../../../components/popups/SelectCity/SelectCity";
import { DownloadImageApi } from "../../../api/DownloadImageApi";

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

const ToolBarComponent = ({ isSticky, isVisible }) => {
  const appContext = useContext(AppContext);

  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [objectOfLisDatas, setObjectOfLisDatas] = useState([]);
  const [calendarAnchor, setCalendarAnchor] = useState(null);
  const [loadingSearchCitis, setLoadingSearchCitis] = useState(false);
  const [isPast65, setIsPast65] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y); // مقدار فعلی اسکرول
      setIsPast65(y >= 30); // آیا کاربر بیشتر از 65px پایین اومده؟
    };

    window.addEventListener("scroll", handleScroll);

    // پاک کردن لیسنر وقتی کامپوننت آن‌مونت شد
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // const handleSelectCity = (selected) => {
  //   setCalendarAnchor(null);
  //   const url = `/search/${selected.titleEn}`;
  //   navigate(url);
  // };
  return (
    <>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          top: isSticky
            ? "0"
            : isVisible
            ? isPast65
              ? "10px"
              : "70px"
            : "10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 23,
            mt: 1.5,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/mag");
          }}
        >
          مجله شبینجا
        </Typography>

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
                placeholder="جستجو مقاله و ... "
                inputProps={{
                  "aria-label": "search",
                  onChange: (e) => handleSearchCities(e.target.value),
                }}
              />
            </Search>
          </Box>
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/mag");
            }}
          >
            صحفه اصلی
          </Button>
        </Box>
      </Toolbar>
    </>
  );
};

export default ToolBarComponent;
