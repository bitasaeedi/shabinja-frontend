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
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ShowAllCategories from "./Components/ShowAllCategories";
import { AppContext } from "../../../../../App";
import MenuSection from "../../MenuSection/MenuSection";
import EachCategory from "./Components/EachCategory";

const Favorites = ({ anchor }) => {
  const { id } = useParams();
  const appContext = useContext(AppContext);

 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(true); // Manage drawer state


  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/account/menu");
    setOpenDrawer(false);
  };


  return isMobile ? (

    
  <>

<Box>
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
          
        </Grid>
      </Box>
    </Box>
  
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

        <Grid item xs={12} md={8} lg={9}>
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

              {id ==="all"  ?  <ShowAllCategories/>:<EachCategory id={id} /> }
            </Box>
          </Grid>
      </Box>
    </SwipeableDrawer>
  </>
  ) : (
    <Box>
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

              {id ==="all"  ?  <ShowAllCategories/>:<EachCategory id={id} /> }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Favorites;
