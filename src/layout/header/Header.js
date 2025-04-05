import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../App";
import DesctopHeader from "./DesctopHeader/DesctopHeader";
import MobileHeader from "./MobileHeader/MobileHeader";

function Header({}) {
  const appContext = useContext(AppContext);
  return (
    <Box
      sx={{
        display:
          appContext?.settingHeader?.showHeader === false ? "none" : "flex",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
        }}
        className="w-100"
      >
        <DesctopHeader />
      </Box>
      {!appContext?.settingHeader?.dontShowMobileHeader && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
          }}
          className="w-100"
        >
          <MobileHeader />
        </Box>
      )}
    </Box>
  );
}

export default Header;
