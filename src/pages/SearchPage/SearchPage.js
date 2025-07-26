import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FilterSection from "./FilterSection/FilterSection";
import CardList from "./CardList/CardList";
import MyMap from "../../components/MyMap/MyMap";
import MapSection from "./components/MapSection";
import { useParams, useSearchParams } from "react-router-dom";
import { HostTourSearchApi } from "../../api/toureApis";
import { AppContext } from "../../App";
import NotFoundComponent from "./components/NotFoundComponent";

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
    // value: [],
    label: "scores",
  },
  {
    // value: [],
    label: "cities",
  },
  {
    // value: [],
    label: "provinces",
  },
];
// Create Context
export const SearchPageContext = createContext();

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [currentPage, setCurrentPage] = useState(0); // شماره pagination
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
      rate: filters?.scores ? filters?.scores?.split(",") : [],
      province: filters?.province?.split(",") || [],
      city: filters?.cities?.split(",") || [],
      locations: listLocation, // لیست نقاط برای جستجو
    };

    console.log("filter: ", filtersParams);
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

  // Handler to navigate to /search/all
  const handleSearchAreaClick = () => {
    navigate("/search/all");
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

  // for map
  const onPolygonDrawn = (list = []) => {
    // var newList = list.map((item, ind) => ({
    //   id: ind + 1,
    //   ...item,
    //   loc: `${item?.lat},${item?.lng}`,
    // }));
    // console.log(newList, "newList");
    // setListCards(newList);

    console.log("pay:", list);

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
            marginTop: { xs: "9px", md: "75px" },
           
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
              <Typography variant="h5">
                {typeHome?.label}
                {/* {searchtype} */}
              </Typography>

              {loadingSearch || listCards?.length > 0 ? (
                <CardList
                  data={listCards}
                  showMap={showMap}
                  toggleMap={toggleMap}
                  loading={loadingSearch}
                />
              ) : (
                <NotFoundComponent />
              )}

              {/* <CardList
                data={listCards || []}
                showMap={showMap}
                toggleMap={toggleMap}
                loading={loadingSearch}
              /> */}
            </Box>
          </Grid>

          {/* Map Section */}
          {!isMobile && showMap && (
            <MapSection
              points={listCards || []}
              onClose={toggleMap}
              onPolygonDrawn={onPolygonDrawn}
              onSearchAreaClick={handleSearchAreaClick}
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
                onSearchAreaClick={handleSearchAreaClick}
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
