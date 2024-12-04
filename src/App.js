import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./layout/footer/Footer";
// Create Context
export const AppContext = createContext(); // <-- Ensure this is exported

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
    textColor: {
      main: "#0d233e",
    },
  },
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ tes: "test" }}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} /> {/* صفحه اصلی */}
            </Routes>
            <Footer />
          </Router>
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
