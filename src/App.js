import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Home from "./pages/Home/Home";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./layout/footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";

import StayPage from "./pages/StayPage/StayPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import PannelPage from "./pages/Pannel/PannelPage";
import NewStaysPage from "./pages/NewStaysPage/NewStaysPage";
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

function App() {
  const [isLoginMain, setIsLoginMain] = useState(false);
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{ tes: "test", isLoginMain, setIsLoginMain }}
        >
          <Router>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* صفحه اصلی */}
              <Route path="/stay/:staycode" element={<StayPage />} />
              <Route path="/search/:searchtype" element={<SearchPage />} />
              <Route path="/account/:section" element={<AccountPage />} />
              <Route path="/pannel/:section" element={<PannelPage />} />
              <Route path="/new-stay/:step" element={<NewStaysPage />} />
              {/* <Route path="*" element={<Home />} /> */}
            </Routes>
            <Footer />
          </Router>
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
