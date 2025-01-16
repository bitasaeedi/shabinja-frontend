import { Box } from "@mui/material";
import DesctopHeader from "./DesctopHeader/DesctopHeader";
import MobileHeader from "./MobileHeader/MobileHeader";

function Header({ showMobileHeader = true, shadow = true }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
        }}
        className="w-100"
      >
        <DesctopHeader shadow={shadow} />
      </Box>
      {showMobileHeader && (
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
