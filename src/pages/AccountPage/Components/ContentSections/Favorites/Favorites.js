import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ShowAllCategories from "./Components/ShowAllCategories";
import MenuSection from "../../MenuSection/MenuSection";
import EachCategory from "./Components/EachCategory";

const Favorites = ({ anchor }) => {
  const { section } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(anchor); // Manage drawer state
  const [id, setId] = useState("all");
  const handleClose = () => {
    navigate("/account/menu");
    setOpenDrawer(false);
  };

  useEffect(() => {
    const segments = location.pathname.split("/");
    setId(segments[segments.length - 1]);
    console.log("id", segments[segments.length - 1]);
  }, [location]);

  return isMobile ? (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        onClose={handleClose}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{
          sx: {
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px 12px 0 0", // Rounded top corners
            backgroundColor: "#fff",
          },
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0, // Ensure `top` is defined
            zIndex: 100,
            py: 1,
          }}
          className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
        >
          <Box>
            <Typography variant="h5" sx={{ fontSize: "16px" }}>
              پسندها
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            align="right"
            gutterBottom
            sx={{
              fontSize: "18px",
              display: { xs: "none", md: "flex" },
            }}
          >
            پسندها
          </Typography>

          <Typography
            variant="h6"
            align="right"
            gutterBottom
            sx={{
              fontSize: "18px",
              display: { xs: "none", md: "flex" },
            }}
          >
            پسندها
          </Typography>

          <Box
            sx={{
              minHeight: "38vh",
              py: { xs: 1, md: 3 },
            }}
            className="shadow borde rounded"
          >
            {id === "all" ? <ShowAllCategories /> : <EachCategory />}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  ) : (
    <Box>
      <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{
          fontSize: "18px",
          display: { xs: "none", md: "flex" },
        }}
      >
        پسندها
      </Typography>

      <Box
        sx={{
          // minHeight: 600,
          py: { xs: 1, md: 3 },
        }}
        className="shadow borde rounded"
      >
        {id === "all" ? <ShowAllCategories /> : <EachCategory />}
      </Box>
    </Box>
  );
};

export default Favorites;
