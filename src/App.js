import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Home from "./pages/Home/Home";
import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./layout/footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";
import StayPage from "./pages/StayPage/StayPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import PannelPage from "./pages/Pannel/PannelPage";
import NewStaysPage from "./pages/NewStaysPage/NewStaysPage";
import EditCalendarPage from "./pages/EditCalendarPage/EditCalendarPage";
import { UserSearchOneApi } from "./api/Users.api";
import AboutUs from "./pages/AboutUs/AboutUs";
import QuestionsPage from "./pages/QuestionsPage/QuestionsPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import MagazinePage from "./pages/MagazinePage/MagazinePage";
import { FavoritDestinationApi } from "./api/toureApis";
import ModalLogin from "./components/Login/ModalLogin";
import { GoftinoSnippet } from "@mohsen007/react-goftino";
import { useMediaQuery } from "@mui/material";
import ReservationStay from "./pages/ReservationStay/ReservationStay";

import { createSignalRContext } from "react-signalr/signalr";
import axios from "axios";
import API_URL from "./config/apiConfig";
import Survey from "./pages/Survey/Survey";

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
  typography: {
    fontFamily: "'YekanBakhFaNum',Tahoma,Arial !important",
    h6: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
    },
    h5: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
    },
    h4: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
    },
    h3: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
    },
    h2: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
    },
    h1: {
      fontFamily: "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
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
    window.scrollTo(0, 0);
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
            hasIcon: false,
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
              }}
            >
              <Router>
                <ScrollToTop />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} /> {/* صفحه اصلی */}
                  <Route path="/stay/:staycode" element={<StayPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/help" element={<QuestionsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/rules" element={<RulesPage />} />
                  <Route path="/mag/:id?" element={<MagazinePage />} />
                  <Route path="/search/:searchtype" element={<SearchPage />} />
                  <Route path="/account/:section/*" element={<AccountPage />} />
                  <Route path="/survey" element={<Survey/>}/>
                  <Route path="/pannel/:section" element={<PannelPage />} />
                  <Route path="/new-stay/:step" element={<NewStaysPage />} />
                  <Route
                    path="/book/:stepName/:code"
                    element={<ReservationStay />}
                  />
                  <Route
                    path="/edit-calendar/:staycode"
                    element={<EditCalendarPage />}
                  />
                  {/* <Route path="*" element={<Home />} /> */}
                </Routes>
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
