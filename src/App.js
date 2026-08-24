import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Home from "./pages/Home/Home";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./layout/footer/Footer";
import { UserSearchOneApi } from "./api/Users.api";
import { FavoritDestinationApi } from "./api/toureApis";
import ModalLogin from "./components/Login/ModalLogin";
import { GoftinoSnippet } from "@mohsen007/react-goftino";
import { useMediaQuery, Box, CircularProgress } from "@mui/material";

import { createSignalRContext } from "react-signalr/signalr";
import axios from "axios";
import API_URL from "./config/apiConfig";

// PERF: only Home (the landing page) is imported eagerly, since it's what
// almost every visitor sees first. Every other route used to be a static
// import at the top of this file — meaning a visitor landing on "/" was
// downloading the JS for the host dashboard (Pannel), the map-based
// calendar editor (EditCalendarPage, pulls in all of Leaflet), the new-stay
// wizard, and every other page before they could even see the homepage.
// React.lazy() + <Suspense> below means each route's code (and its heavy
// dependencies - Leaflet, Swiper, SweetAlert2, the date picker, etc.) is
// only fetched when someone actually navigates to that route.
const SearchPage = lazy(() => import("./pages/SearchPage/SearchPage"));
const StayPage = lazy(() => import("./pages/StayPage/StayPage"));
const AccountPage = lazy(() => import("./pages/AccountPage/AccountPage"));
const PannelPage = lazy(() => import("./pages/Pannel/PannelPage"));
const NewStaysPage = lazy(() => import("./pages/NewStaysPage/NewStaysPage"));
const EditCalendarPage = lazy(() =>
  import("./pages/EditCalendarPage/EditCalendarPage")
);
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const QuestionsPage = lazy(() => import("./pages/QuestionsPage/QuestionsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const RulesPage = lazy(() => import("./pages/RulesPage/RulesPage"));
const MagazinePage = lazy(() => import("./pages/MagazinePage/MagazinePage"));
const ReservationStay = lazy(() =>
  import("./pages/ReservationStay/ReservationStay")
);
const Survey = lazy(() => import("./pages/Survey/Survey"));
const Loan = lazy(() => import("./pages/Loan/Loan"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// Small, dependency-free fallback so the Suspense boundary itself doesn't
// pull in anything extra while a lazy chunk is loading.
const RouteFallback = () => (
  <Box
    sx={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

const GOFTINO_KEY = "FnQe1u";

export const SignalRContext = createSignalRContext();
// Create Context
export const AppContext = createContext();

// RTL cache mui
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

// my theme mui
const theme = createTheme({
  direction: "rtl",
  zIndex: {
    drawer: 11000,
    menu: 20000,
    modal: 21000,
  },
  typography: {
    fontFamily: "'YekanBakhFaNum', 'Inter',Tahoma,Arial !important",
    h6: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
    h5: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
    h4: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
    h3: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
    h2: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
    h1: {
      fontFamily:
        "'yakanBold','YekanBakhFaNum', 'Inter', Tahoma, Arial, sans-serif",
    },
  },

  palette: {
    primary: {
      main: "#287dfa",
      light: "#42a5f5",
      dark: "#106df6",
      contrastText: "#fff",
    },
    dark: {
      main: "#000000",
    },
    textColor: {
      main: "#0d233e",
    },
  },
});

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top on route changes, not on component re-renders
    // Use smooth scrolling to prevent jarring jumps
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoginMain, setIsLoginMain] = useState(false);
  const [showFooter, setShowfooter] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [settingHeader, setSettingHeader] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "", lastName: "" });
  const [favoritDestination, setFavoritDestination] = useState([]);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const [countdown, setCountdown] = useState(120); //login timer
  const handleSetTimerCountDown = (value) => {
    setCountdown(value);
  };
  const [codeIsSend, setCodeIsSend] = useState(false);
  // Start countdown timer
  const handleSetCodeIsSend = (value) => {
    setCodeIsSend(value);
  };
  const handleSetIsResendEnabled = (value) => {
    setIsResendEnabled(value);
  };
  useEffect(() => {
    if (codeIsSend) {
      if (countdown > 0) {
        const timer = setInterval(
          () => handleSetTimerCountDown((prev) => prev - 1),
          1000
        );
        return () => clearInterval(timer);
      } else {
        setIsResendEnabled(true);
      }
    }
  }, [countdown, codeIsSend]);
  //  goftino

  function handleGofino() {
    setHideButton(!hideButton);
  }

  const handleModalClose = () => {
    setOpenModalLogin(false);
  };

  const handleShowModal = () => {
    setOpenModalLogin(true);
  };

  useEffect(() => {
    if (isLoginMain) {
      handleGetInfoUser();
    }
    getListData();
  }, [isLoginMain]);

  const handleGetInfoUser = async () => {
    const profile = await UserSearchOneApi();
    console.log(profile?.data, "profile");
    setUserInfo({
      name: profile?.data?.firstName || "",
      lastName: profile?.data?.lastName || "",
      imageUrl: profile?.data?.image?.url || "",
      userIsHost: true,
      mobile: profile?.data?.mobile,
      // ...profile?.data,
    });
  };

  // مقاصد محبوب
  const getListData = async (dataToFilter) => {
    const resultGetFavorit = await FavoritDestinationApi(dataToFilter);
    var list = resultGetFavorit?.data;
    // console.log(list, "FavoritDestinationApi list");
    setFavoritDestination(list);
    return list;
  };

  return (
    <>
      <GoftinoSnippet
        goftinoKey={GOFTINO_KEY}
        onReady={() => {
          window.Goftino.setWidget({
            hasIcon: isMobile ? false : true,
          });
        }}
        onClose={() => {
          setHideButton(false);
        }}
      />

      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <SignalRContext.Provider
            // connectEnabled={!!token}
            // accessTokenFactory={() => token}
            // dependencies={[token]}
            url={"https://apibasegateway.shabinja.com/OrderHub"}
          >
            <AppContext.Provider
              value={{
                isLoginMain,
                setIsLoginMain,
                showFooter,
                setShowfooter,
                handleGetInfoUser,
                showHeader,
                setShowHeader,
                settingHeader,
                setSettingHeader,
                userInfo,
                favoritDestination,
                handleShowModal,
                handleModalClose,
                handleGofino,
                handleSetTimerCountDown,
                countdown,
                handleSetCodeIsSend,
                codeIsSend,
                isResendEnabled,
                handleSetIsResendEnabled,
              }}
            >
              <Router>
                <ScrollToTop />
                <Header />
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} /> {/* صفحه اصلی */}
                    <Route path="/stay/:staycode" element={<StayPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/help" element={<QuestionsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/rules" element={<RulesPage />} />
                    <Route path="/search/:searchtype" element={<SearchPage />} />
                    <Route path="/mag/:id?" element={<MagazinePage />} />
                    <Route path="/account/:section/*" element={<AccountPage />} />
                    <Route path="/pannel/:section" element={<PannelPage />} />
                    <Route path="/survey/:code" element={<Survey />} />
                    <Route path="/new-stay/:step" element={<NewStaysPage />} />
                    <Route path="/loan" element={<Loan />} />
                    <Route
                      path="/book/:stepName/:code"
                      element={<ReservationStay />}
                    />
                    <Route
                      path="/edit-calendar/:staycode"
                      element={<EditCalendarPage />}
                    />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                    {/* <Route path="*" element={<Home />} /> */}
                  </Routes>
                </Suspense>
                <Footer />
                {openModalLogin && (
                  <ModalLogin
                    open={openModalLogin}
                    handleClose={handleModalClose}
                  />
                )}
              </Router>
            </AppContext.Provider>
          </SignalRContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
