import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";
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
import { useParams, useSearchParams } from "react-router-dom";
import { HostTourSearchApi } from "../../api/toureApis";
import Header from "../../layout/header/Header";
import { AppContext } from "../../App";

const filterList = [
  {
    value: 0,
    label: "count",
  },
  {
    // value: 0,
    label: "min",
  },
  {
    // value: 0,
    label: "max",
  },
  {
    value: false,
    label: "justGuarantees",
  },
  {
    value: 0,
    label: "room",
  },
  {
    // value: [],
    label: "rules",
  },
  {
    // value: [],
    label: "typeHost",
  },
  {
    // value: [],
    label: "typeHostLoc",
  },
  {
    // value: [],
    label: "features",
  },
  {
    value: [],
    label: "scores",
  },
  {
    // value: [],
    label: "cities",
  },
];
// Create Context
export const SearchPageContext = createContext();

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
  { id: 10, lat: 37.16455550723973, lng: 54.46472167968751 },
  { id: 11, lat: 36.64494026496907, lng: 54.16472167968751 },
  { id: 12, lat: 36.64494026496907, lng: 54.764721679687504 },
  { id: 13, lat: 36.76204391593001, lng: 59.58160400390626 },
  { id: 14, lat: 36.06922359290246, lng: 59.18160400390626 },
  { id: 15, lat: 36.06922359290246, lng: 59.981604003906256 },
];

const SearchPage = () => {
  const location = useLocation();
  const [typeHome, setTypeHome] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [active, setActive] = useState(false);
  const [listFiltersInUrl, setListFiltersInUrl] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [listCards, setListCards] = useState([]);
  const [resutSearchTours, setResultSearchTours] = useState({});
  const isMobile = useMediaQuery("(max-width: 800px)");
  const [searchParams] = useSearchParams();
  const cardListRef = useRef(null);
  const { searchtype } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // شماره pagination
  const appContext = useContext(AppContext);
  const [listLocation, setListLocation] = useState([]);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: false,
      removeShadow: true,
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchtype, searchParams.toString(), currentPage, listLocation]);

  //     window.scroll(0, 0);
  // Function to parse URL params
  const handleFindeParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries([...params]);
  };

  // Function to perform the search
  const handleSearch = async () => {
    setLoadingSearch(true);

    const filters = handleFindeParams(); // Get the parsed params

    // ارتباط با api
    const filtersParams = {
      title: searchtype,
      start: filters?.start, // شمسی
      end: filters?.end, // شمسی
      count: filters?.count, //
      room: filters?.room,
      minprice: filters?.min,
      maxprice: filters?.max,
      skip: currentPage,
      take: 20,
      // sort: filters?.sort,
      rolItemTour: filters?.rules?.split(",") || [], // قوانین
      typeHost: filters?.typeHost?.split(",") || [], // نوع اقامتگاه
      typeHostLoc: filters?.typeHostLoc?.split(",") || [], // نوع منطقه
      otherItemTour: filters?.features?.split(",") || [],
      rate: filters?.scores?.split(",") || [],
      // province: searchData?.province ,
      city: filters?.cities?.split(",") || [],
      locations: listLocation, // لیست نقاط برای جستجو
    };

    const result = await HostTourSearchApi(filtersParams);
    setListCards(result?.data?.items);
    setResultSearchTours(result?.data);
    // setTimeout(() => {
    setLoadingSearch(false);
    // }, 1000);
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    window.scroll(0, 0);
  };

  // بررسی اینکه ایا گزینه فیلتر فعال باشد یا خیر
  const isFilterActive = () => {
    var countFilterActive = 0;
    var listFiltersWithValues = [];
    filterList.forEach((filter) => {
      const params = new URLSearchParams(window.location.search);
      const valueOfFilterSeted = params.get(filter.label);
      if (valueOfFilterSeted) {
        countFilterActive += 1;
        listFiltersWithValues.push({
          value: valueOfFilterSeted,
          label: filter.label,
        });
      }
    });
    if (countFilterActive > 0) {
      setActive(true);
    } else {
      setActive(false);
    }

    setListFiltersInUrl(listFiltersWithValues);
  };

  const onPolygonDrawn = (list = []) => {
    // var newList = list.map((item, ind) => ({
    //   id: ind + 1,
    //   ...item,
    //   loc: `${item?.lat},${item?.lng}`,
    // }));
    // console.log(newList, "newList");
    // setListCards(newList);
    setListLocation(list || []);
  };

  return (
    <SearchPageContext.Provider
      value={{
        handleSearch: handleSearch,
        isFilterActive: isFilterActive, //  مربوط به گزینه فیلترهمه یکجا
        active: active, //  مربوط به گزینه فیلترهمه یکجا
        setActive: setActive, //  مربوط به گزینه فیلترهمه یکجا
        filterList: filterList, //  مربوط به گزینه فیلترهمه یکجا
        listFiltersInUrl: listFiltersInUrl, // لیست مقادیری که در url هستند
        resutSearchTours, // نتیجه جستجو
        currentPage,
        setCurrentPage,
      }}
    >
      <Box sx={{ position: "relative" }} className=" ">
        {/* Filter Section */}
        {/* <Header shadow={false} /> */}
        <FilterSection />

        {/* Main Content */}
        <Grid
          container
          sx={{
            flexDirection: "row",
            padding: "16px",
            marginTop: { xs: "9px", md: "65px" },
          }}
          className=" "
        >
          {/* Card List Section */}
          <Grid
            item
            xs={showMap && !isMobile ? 6 : 12}
            sx={
              {
                // pr: 2,
              }
            }
            className=" p-0 m-0 "
          >
            <Box
              ref={cardListRef}
              sx={{
                overflowY: "auto",
                // paddingRight: "16px",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
              className=" "
            >
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {typeHome?.label}
                {/* {searchtype} */}
              </Typography>
              <CardList
                data={listCards || []}
                showMap={showMap}
                toggleMap={toggleMap}
                loading={loadingSearch}
              />
            </Box>
          </Grid>

          {/* Map Section */}
          {!isMobile && showMap && (
            <MapSection
              points={listCards || []}
              onClose={toggleMap}
              onPolygonDrawn={onPolygonDrawn}
            />
            // MAP_POINTS
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
                points={listCards || []}
                // points={MAP_POINTS}
                centerInitial={[2.2728759, 75.6305622]}
                onPolygonDrawn={onPolygonDrawn}
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
    </SearchPageContext.Provider>
  );
};

export default SearchPage;
