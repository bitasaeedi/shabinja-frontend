import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuSection from "./Components/MenuSection/MenuSection";
import Profile from "./Components/ContentSections/Profile/Profile";
import Favorites from "./Components/ContentSections/Favorites/Favorites";
import Header from "../../layout/header/Header";
import AskToLogin from "../../components/Login/AskToLogin/AskToLogin";
import CheckTokenExpiration from "../../components/checkTokenExpiration/CheckTokenExpiration";
import { AppContext } from "../../App";
import Reservations from "./Components/ContentSections/Reservations/Reservations";
import { Wallet } from "@mui/icons-material";
import WalletComponent from "./Components/ContentSections/WalletComponent/WalletComponent";
import BackUpSection from "./Components/ContentSections/BackUpSection/BackUpSection";

const AccountPage = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const { section } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile view
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    appContext.setShowfooter(false);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (!["profile", "favorites", "reservations", "wallet", "support"].includes(section)) {
      navigate("/404");
    }
  }, [section]);

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
              {section === "profile" && <Profile anchor isMobile={isMobile} />}

              {section === "favorites" && (
                <Favorites anchor isMobile={isMobile} />
              )}

              {section === "reservations" && (
                <Reservations anchor isMobile={isMobile} />
              )}
              {section === "wallet" && (
                <WalletComponent
                  anchor
                  isMobile={isMobile}
                  nameSection="account"
                />
              )}
              {section === "support" && (
                <BackUpSection
                  anchor
                  isMobile={isMobile}
                  nameSection="account"
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

export default AccountPage;
