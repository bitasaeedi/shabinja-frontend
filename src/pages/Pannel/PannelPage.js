import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuSection from "./Components/MenuSection/MenuSection";
import Header from "../../layout/header/Header";
import AskToLogin from "../../components/Login/AskToLogin/AskToLogin";
import { AppContext } from "../../App";
import Dashboard from "./Components/ContentSections/Dashboard/Dashboard";
import Stays from "./Components/ContentSections/Stays/Stays";
import Requests from "./Components/ContentSections/Requests/Requests";
import WalletComponent from "../AccountPage/Components/ContentSections/WalletComponent/WalletComponent";
import BackUpSection from "../AccountPage/Components/ContentSections/BackUpSection/BackUpSection";

const PannelPage = () => {
  const appContext = useContext(AppContext);
  const { section } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile view
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    appContext.setShowfooter(false);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
    });
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* <Header showMobileHeader={false} /> */}
      {appContext?.isLoginMain ? (
        <Box
          sx={{
            width: { xs: "100%", md: "90%" },
            margin: "0 auto",
            padding: { xs: 2, md: 0 },
            mb: 4,
          }}
        >
          <Box sx={{ height: { xs: 0, md: 80 } }}></Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {/* Left section: Menu */}
            <Grid item xs={12} md={4} lg={3}>
              <MenuSection />
            </Grid>
            {/* Right section: Dynamic content */}
            <Grid item xs={12} md={8} lg={9}>
              {section === "dashboard" && (
                <Dashboard anchor isMobile={isMobile} />
              )}
              {section === "stays" && <Stays anchor isMobile={isMobile} />}
              {section === "requests" && (
                <Requests anchor isMobile={isMobile} />
              )}
              {/* {section === "hosting-calendar" && (
                <Dashboard anchor isMobile={isMobile} />
              )} */}
              {section === "wallet" && (
                <WalletComponent
                  anchor
                  isMobile={isMobile}
                  nameSection="pannel"
                />
              )}

              {section === "support" && (
                <BackUpSection
                  anchor
                  isMobile={isMobile}
                  nameSection="pannel"
                />
              )}
            </Grid>
          </Grid>
        </Box>
      ) : loading ? (
        <>
          <Box sx={{ minHeight: "60vh" }}>
            <span>loading...</span>
          </Box>
        </>
      ) : (
        <AskToLogin />
      )}
    </>
  );
};

export default PannelPage;
