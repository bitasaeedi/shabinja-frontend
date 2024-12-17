import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FilterSection from "./FilterSection/FilterSection";
import CardList from "./CardList/CardList";
import MyMap from "../../components/MyMap/MyMap";
import MapSection from "./components/MapSection";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import { useParams, useSearchParams } from "react-router-dom";
const MAP_POINTS = [
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
const ITEMS_FAST_SEARCH = ItemsFastSearch;
const SearchPage = () => {
  const location = useLocation();
  const [typeHome, setTypeHome] = useState({});
  const [showMap, setShowMap] = useState(false);
  const isMobile = useMediaQuery("(max-width: 800px)");
  const [searchParams] = useSearchParams();
  const cardListRef = useRef(null);
  const { seachtype } = useParams();
  useEffect(() => {
    window.scroll(0, 0);
    handleSearch();
  }, [seachtype, searchParams]);

  const handleFindeParams = () => {
    const paramsObject = Object.fromEntries([...searchParams]);
    console.log(paramsObject, "paramsObject");
  };

  const handleSearch = () => {
    const filters = handleFindeParams();
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    window.scroll(0, 0);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Filter Section */}
      <FilterSection />

      {/* Main Content */}
      <Grid
        container
        sx={{
          flexDirection: "row",
          padding: "16px",
          marginTop: { xs: "9px", md: "65px" },
        }}
      >
        {/* Card List Section */}
        <Grid item xs={showMap && !isMobile ? 6 : 12} sx={{ pr: 2 }}>
          <Box
            ref={cardListRef}
            sx={{
              overflowY: "auto",
              paddingRight: "16px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {typeHome?.label}
              {/* {seachtype} */}
            </Typography>
            <CardList
              data={Array.from({ length: 14 }, (_, i) => i + 1)}
              showMap={showMap}
              toggleMap={toggleMap}
            />
          </Box>
        </Grid>

        {/* Map Section */}
        {!isMobile && showMap && (
          <MapSection points={MAP_POINTS} onClose={toggleMap} />
        )}
      </Grid>

      {/* Map Modal for Mobile */}
      {isMobile && showMap && (
        <Modal open={showMap} onClose={toggleMap} fullScreen={true}>
          <Box
            sx={{
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <MyMap
              points={MAP_POINTS}
              centerInitial={[2.2728759, 75.6305622]}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
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
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default SearchPage;
