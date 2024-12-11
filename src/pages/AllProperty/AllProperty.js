import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  Modal,
} from "@mui/material";
import FilterSection from "./FilterSection/FilterSection";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import { useLocation } from "react-router-dom";
import CardList from "./CardList/CardList";
import MyMap from "../../components/MyMap/MyMap";
import CloseIcon from "@mui/icons-material/Close";

const AllProperty = () => {
  const location = useLocation();
  const [typeHome, setTypeHome] = useState({});
  const [showMap, setShowMap] = useState(false);
  const listPropertiys = ItemsFastSearch;
  const isMobile = useMediaQuery("(max-width: 800px)");

  const cardListRef = useRef(null);

  useEffect(() => {
    window.scroll(0, 0);
    const page = listPropertiys.find(
      (item) => item.linkAddres === location.pathname
    );
    setTypeHome(page);
  }, []);

  const toggleMap = () => {
    setShowMap(!showMap);
    window.scroll(0, 0);
  };

  const points = [
    { id: 1, lat: 36.022227982837855, lng: 51.339111328125 },
    { id: 2, lat: 35.502612740567194, lng: 51.039111328125 },
    { id: 3, lat: 35.502612740567194, lng: 51.639111328125 },
    { id: 4, lat: 36.25940141440749, lng: 57.53540039062501 },
    { id: 5, lat: 35.91299125289372, lng: 57.335400390625004 },
    { id: 6, lat: 35.91299125289372, lng: 57.73540039062501 },
    { id: 7, lat: 36.91475604864165, lng: 55.54412841796876 },
    { id: 8, lat: 36.2219357256141, lng: 55.14412841796876 },
    { id: 9, lat: 36.2219357256141, lng: 55.944128417968756 },
  ];

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* Filter Section */}
      {<FilterSection />}

      {/* Main Content */}
      <Grid
        container
        sx={{
          flexDirection: "row",
          padding: "16px",
          marginTop: "65px",
        }}
      >
        {/* Card List Section */}
        <Grid
          item
          xs={showMap && !isMobile ? 6 : 12}
          sx={{
            pr: 2,
          }}
        >
          <Box
            ref={cardListRef}
            sx={{
              overflowY: "auto",
              paddingRight: "16px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Typography variant="h5" className="my-4">
              {typeHome?.label}
            </Typography>
            <CardList data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]} />
          </Box>
        </Grid>

        {/* Map Section for Desktop */}
        {!isMobile && showMap && (
          <Grid
            item
            xs={6}
            sx={{
              position: "sticky",
              top: "150px",
              height: "calc(90vh - 65px)",
              overflow: "hidden",
              borderRadius: 3,
              zIndex: 2,
            }}
          >
            <MyMap points={points} centerInitial={[2.2728759, 75.6305622]} />
            <IconButton
              sx={{
                position: "absolute",
                top: "20px",
                left: "20px",
                backgroundColor: "white",
                zIndex: 1000,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={toggleMap}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>

      {/* Toggle Map Button */}
      {!showMap && (
        <Button
          variant="contained"
          sx={{
            position: "fixed",
            bottom: { xs: 60, md: 30 },
            left: { xs: "15px", md: "50%" },
            transform: { xs: "translateX(0%)", md: "translateX(-50%)" },
            zIndex: 1000,
          }}
          size="small"
          onClick={toggleMap}
        >
          نمایش روی نقشه
        </Button>
      )}

      {/* Map Modal for Mobile */}
      {isMobile && (
        <Modal open={showMap} onClose={toggleMap}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              height: "90%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              overflow: "hidden",
              zIndex: 90000,
            }}
          >
            <MyMap points={points} centerInitial={[2.2728759, 75.6305622]} />
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "white",
                zIndex: 1000,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={toggleMap}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default AllProperty;
