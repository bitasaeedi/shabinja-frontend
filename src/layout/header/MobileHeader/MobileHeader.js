import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  InputBase,
} from "@mui/material";
import { styled, useTheme, alpha } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import logo_with_name from "../../../images/shabinja_logo_with_name.png";
import logo_with_name_white from "../../../images/shabinja_logo_with_name_white.png";
import CheckTokenExpiration from "../../../components/checkTokenExpiration/CheckTokenExpiration";
import RemoveStorageLogin from "../../../components/RemoveStorageLogin/RemoveStorageLogin";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../App";
import { useContext } from "react";
import SelectCity from "../../../components/popups/SelectCity/SelectCity";
import { HostTourSearchTitleApi } from "../../../api/toureApis";
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
  const appContext = useContext(AppContext);

  const [userName, setUserName] = useState("کاربر شبینجا");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [objectOfLisDatas, setObjectOfLisDatas] = useState([]);
  const [calendarAnchor, setCalendarAnchor] = useState(null);
  const [loadingSearchCitis, setLoadingSearchCitis] = useState(false);

  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight * 0.1);
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
        // setIsLogin(true);
        appContext.setIsLoginMain(true);
        setUserName(localStorage.getItem("name") || "کاربر شبینجا"); // Fallback name if not set
      } else {
        // setIsLogin(false);
        appContext.setIsLoginMain(false);
        setUserName("کاربر شبینجا");
      }
    };

    // Initial check on mount
    checkLoginStatus();
  }, [localStorage.getItem("access_token")]);

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
      {location.pathname === "/" || true ? (
        <Box className=" w-100 ">
          <CssBaseline />
          <AppBar
            sx={{
              position: isSticky ? "fixed" : "static", // 'relative' keeps it inside the flow
              backgroundColor: isSticky ? "white" : "white",
              color: theme.palette.text.primary,
              boxShadow:
                location.pathname !== "/" ||
                (!isSticky && location.pathname == "/")
                  ? "none"
                  : "0px 4px 8px rgba(0, 0, 0, 0.2)",
              // boxShadow: "none",
              width: "100%", // Ensure it takes full width
            }}
            component="nav"
          >
            <Toolbar sx={{ px: { xs: 1, md: "unset" } }}>
              <Grid container spacing={0} className="pb-3 w-100">
                {/* Top Bar: Logo and User Section */}
                <Grid
                  xs={4}
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
                    xs={4}
                    sx={{
                      display: isSticky ? "none" : "inline",
                      maxWidth: 215,
                    }}
                  >
                    <Link
                      to="/"
                      className="w-100"
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        component="img"
                        src={logo_with_name}
                        alt="شبینجا: اجاره ویلا - اجاره سوئیت"
                        className="my-0 py-0 mt-3"
                        sx={{
                          maxWidth: 115,
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                      {/* <Box className="my-0 py-0 pt-1">
                        <Typography variant="body2" sx={{ color: "#9999" }}>
                          اجاره ویلا، سوئیت و اقامتگاه در سراسر ایران
                        </Typography>
                      </Box> */}
                    </Link>
                  </Grid>

                  {/* User Section */}
                  {/* <Grid item xs="auto">
                    {appContext.isLoginMain ? (
                      <div></div>
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
                        onClick={appContext?.handleShowModal}
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
                  </Grid> */}
                </Grid>

                {/* Search Bar */}
                <Grid item xs={isSticky ? 12 : 8} className="w-100 mt-3">
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
                          top:
                            calendarAnchor.getBoundingClientRect().bottom + 30,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "100%",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          zIndex: 1000,
                          px: 3,
                        }}
                      >
                        <SelectCity
                          closePopup={() => setCalendarAnchor(null)}
                          selectedCity={(item) => {
                            handleSelectCity(item);
                          }}
                          objectOfLisDatas={objectOfLisDatas}
                          loading={loadingSearchCitis}
                          widthSize={"100%"}
                          disableOnoutClose={true}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default MobileHeader;
