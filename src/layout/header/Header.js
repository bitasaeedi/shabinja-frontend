import { Box } from "@mui/material";
import DesctopHeader from "./DesctopHeader/DesctopHeader";
import MobileHeader from "./MobileHeader/MobileHeader";

function Header() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        className="w-100"
      >
        <DesctopHeader />
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
        }}
        className="w-100"
      >
        <MobileHeader />
      </Box>
    </Box>
  );
}

export default Header;
