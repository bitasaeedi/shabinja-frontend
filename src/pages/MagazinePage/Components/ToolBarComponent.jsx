import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../../../App";
import InputBase from "@mui/material/InputBase";
import { styled, useTheme, alpha } from "@mui/system";
import CheckTokenExpiration from "../../../components/checkTokenExpiration/CheckTokenExpiration";
import { useState } from "react";
import { MagPageContext } from "../MagazinePage";

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

const ToolBarComponent = ({ isSticky, isVisible, isMobile }) => {
  const appContext = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [calendarAnchor, setCalendarAnchor] = useState(null);
  const [isPast65, setIsPast65] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { handleTitleFilter, handleCategoryFilter, handleTagsFilter } =useContext(MagPageContext);

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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateClick = (event, field) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      // Check if we're on a specific blog post page (/mag/id)
      const isOnBlogPost =
        location.pathname.startsWith("/mag/") && location.pathname !== "/mag";

      if (isOnBlogPost) {
        // Navigate to main magazine page first, then perform search
        navigate("/mag");
        // Use setTimeout to ensure navigation completes before setting the filter
        setTimeout(() => {
          handleTitleFilter(searchValue.trim());
        }, 100);
      } else {
        // We're already on the main magazine page, just perform search
        handleTitleFilter(searchValue.trim());
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
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
          px: { xs: 1.1, md: 2 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: isMobile ? 20 : 23,
            mt: 1.5,
            cursor: "pointer",
          }}
          onClick={() => {
            handleCategoryFilter(null);
            handleTagsFilter(null);
            handleTitleFilter(null);
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
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                inputProps={{
                  "aria-label": "search",
                }}
              />
            </Search>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "unset" } }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
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
