import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ContainerFilters from "./Component/ContainerFilters";
import {
  GetOtherItemTourList,
  GetRollesList,
} from "../../../../../api/PublicApis";
import {
  GetTypeHostListApi,
  GetTypeHostLocListApi,
} from "../../../../../api/toureApis";
import { SearchPageContext } from "../../../SearchPage";
export const PopVerFilterContext = createContext();

const PopVerFilter = ({ callBackFunc, anchorEl, handleClosePopover }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile
  const searchPageContext = useContext(SearchPageContext);
  // ---
  const [justGuarantees, setJustGuarantees] = useState(false); //رزرو قطعی
  // ---
  const [countPeople, setCountPeople] = useState(0); //تعداد نفرات
  // ---
  const [countRoom, setCountRoom] = useState(0); //تعداد اتاق
  // ----
  const [listRolles, setListRolles] = useState([]);
  const [selectedListRolles, setSelectedListRolles] = useState([]);
  // ----
  const [listOtherItem, setListOtherItem] = useState([]);
  const [selectedListOtherItem, setSelectedListOtherItem] = useState([]);

  const [listTypeHost, setListTypeHost] = useState([]);
  const [selectedListTypeHost, setSelectedListTypeHost] = useState([]);
  // ---
  const [listTypeHostLoc, setListTypeHostLoc] = useState([]);
  const [selectedListTypeHostLoc, setSelectedListTypeHostLoc] = useState([]);
  //===
  const [selectedRangPriceList, setSelectedRangPriceList] = useState([]);
  // ==
  const [selectedListScore, setSelectedListScore] = useState([]);
  // ===
  const [selectedListCity, setSelectedListCity] = useState([]);
  const [listProvince, setListProvince] = useState([]);

  useEffect(() => {
    setListProvince(searchPageContext?.resutSearchTours?.provinces || []); //استان ها
    setListTypeHostLoc(searchPageContext?.resutSearchTours?.typeHostLocs || []); // نوع منطقه
    setListTypeHost(searchPageContext?.resutSearchTours?.typeHosts || []); // نوع اقامتگاه
    setListOtherItem(searchPageContext?.resutSearchTours?.otherItemTours || []); // امکانات
  }, [searchPageContext?.resutSearchTours]);

  useEffect(() => {
    const listValues = searchPageContext.listFiltersInUrl;
    // Define default values
    var justGuarantees = false; // Replace with your desired default
    var countPeopleNum = 0; // Replace with your desired default
    var countRoomNum = 0;
    var rollList = [];
    var tyeHostList = [];
    var featuresList = [];
    var typeHostLocList = [];
    var scoresList = [];
    var cityList = [];
    listValues.forEach((element) => {
      if (element.label === "justGuarantees") {
        justGuarantees = element.value;
      } else if (element.label === "count") {
        countPeopleNum = parseFloat(element.value);
      } else if (element.label === "room") {
        countRoomNum = parseFloat(element.value);
      } else if (element.label === "scores") {
        var listScores = element?.value?.split(",");
        scoresList = listScores || [];
      } else if (element.label === "rules") {
        var listRolees = element?.value?.split(",");
        rollList = listRolees || [];
      } else if (element.label === "typeHost") {
        tyeHostList = element?.value?.split(",") || [];
      } else if (element.label === "features") {
        featuresList = element?.value?.split(",") || [];
      } else if (element.label === "typeHostLoc") {
        typeHostLocList = element?.value?.split(",") || [];
      } else if (element.label === "cities") {
        cityList = element?.value?.split(",") || [];
      } else if (element.label === "min") {
        setSelectedRangPriceList((prev) => [
          parseFloat(element?.value),
          ...prev.slice(1),
        ]);
      } else if (element.label === "max") {
        setSelectedRangPriceList((prev) => [
          ...prev.slice(0, 1),
          parseFloat(element?.value),
        ]);
      }
    });

    // Update state with the resolved values
    setJustGuarantees(justGuarantees);
    setCountPeople(countPeopleNum);
    setCountRoom(countRoomNum);
    setSelectedListRolles(rollList);
    setSelectedListTypeHost(tyeHostList);
    setSelectedListTypeHostLoc(typeHostLocList);
    setSelectedListScore(scoresList); // لیست امتیازات
    setSelectedListOtherItem(featuresList);
    setSelectedListCity(cityList);
  }, [searchPageContext.listFiltersInUrl.length]);

  // دریافت لیست ها
  useEffect(() => {
    handleGetRol();
    // handleGetOtherItemTourList();
    // handleGetTypeHostList();
    // handleGetTypeHostLocList();
  }, []);

  // دریافت لیست قوانین
  const handleGetRol = async () => {
    let myList = [];
    myList = await GetRollesList();
    setListRolles(myList.data || []);
    return myList || [];
  };
  // لیست سایر امکانات
  const handleGetOtherItemTourList = async () => {
    let myList = [];
    myList = (await GetOtherItemTourList()) || [];
    setListOtherItem(myList.data || []);
    return myList || [];
  };

  // لیست نوع اقامتگاه
  const handleGetTypeHostList = async () => {
    let myList = [];
    myList = await GetTypeHostListApi();
    setListTypeHost(myList.data || []);
    return myList || [];
  };

  // لیست نوع منطقه
  const handleGetTypeHostLocList = async () => {
    let myList = [];
    myList = await GetTypeHostLocListApi();
    setListTypeHostLoc(myList.data || []);
    return myList || [];
  };

  const counterRef = useRef();

  // ارسال فیلتر ها به url  و فراخوانی تابع سرچ
  const handleSubmitFilters = () => {
    const listFilters = [
      {
        value: justGuarantees,
        label: "justGuarantees",
      },
      {
        value: countPeople,
        label: "count",
      },
      {
        value: countRoom,
        label: "room",
      },
      {
        value:
          selectedListRolles?.length > 0
            ? selectedListRolles.map((item) => item)
            : null,
        label: "rules",
      },
      {
        value:
          selectedListTypeHost?.length > 0
            ? selectedListTypeHost.map((item) => item)
            : null,
        label: "typeHost",
      },
      {
        value:
          selectedListTypeHostLoc?.length > 0
            ? selectedListTypeHostLoc.map((item) => item)
            : null,
        label: "typeHostLoc",
      },
      {
        value:
          selectedListOtherItem?.length > 0
            ? selectedListOtherItem.map((item) => item)
            : null,
        label: "features",
      },
      {
        value: selectedRangPriceList[0],
        label: "min",
      },
      {
        value: selectedRangPriceList[1],
        label: "max",
      },
      {
        value: selectedRangPriceList[1],
        label: "max",
      },
      {
        value:
          selectedListScore?.length > 0
            ? selectedListScore.map((item) => item)
            : null,
        label: "scores",
      },
      {
        value:
          selectedListCity?.length > 0
            ? selectedListCity.map((item) => item)
            : null,
        label: "cities",
      },
    ];
    callBackFunc(listFilters);
  };

  const handleDeleteFilters = () => {
    setSelectedRangPriceList([]);
    callBackFunc();
  };

  return (
    <>
      <PopVerFilterContext.Provider
        value={{
          handleSubmitFilters: handleSubmitFilters,
          // ---
          justGuarantees: justGuarantees,
          setJustGuarantees: setJustGuarantees,
          // ---
          countPeople,
          setCountPeople,
          // ----
          countRoom,
          setCountRoom,
          // ---
          selectedRangPriceList,
          setSelectedRangPriceList,
          // ---
          listRolles: listRolles,
          selectedListRolles: selectedListRolles,
          setSelectedListRolles: setSelectedListRolles,
          // ---
          listOtherItem: listOtherItem,
          selectedListOtherItem: selectedListOtherItem,
          setSelectedListOtherItem: setSelectedListOtherItem,
          // ---
          listTypeHost: listTypeHost,
          selectedListTypeHost: selectedListTypeHost,
          setSelectedListTypeHost: setSelectedListTypeHost,
          // ---
          listTypeHostLoc,
          selectedListTypeHostLoc,
          setSelectedListTypeHostLoc,
          // ---
          selectedListScore,
          setSelectedListScore,
          // ==
          selectedListCity,
          setSelectedListCity,
          listProvince,
        }}
      >
        {isMobile ? (
          <SwipeableDrawer
            anchor="bottom"
            open={Boolean(anchorEl)}
            onClose={handleClosePopover}
            onOpen={() => {}} // Optional: Add logic if needed when opening
            PaperProps={{
              sx: {
                maxHeight: "92vh", // Full-screen height
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px 12px 0 0", // Rounded top corners
                backgroundColor: "#ffff",
              },
            }}
          >
            {/* Fixed Header */}
            <Box
              sx={{
                position: "sticky",
                top: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
            >
              <Box>
                <Typography variant="h5" sx={{ fontSize: "20px" }}>
                  فیلترها
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleClosePopover}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider />

            {/* Scrollable Content */}
            <Box
              sx={{
                flex: 1, // Fills available space
                overflowY: "auto", // Makes content scrollable
                padding: "16px",
              }}
            >
              <ContainerFilters />
            </Box>

            <Divider />

            {/* Fixed Footer */}
            <Box
              sx={{
                position: "sticky",
                bottom: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-2 bg-white border-top border-muted"
            >
              <Button
                sx={{
                  color: "black",
                }}
                variant="text"
                size="small"
                onClick={handleDeleteFilters}
              >
                حذف فیلتر
              </Button>
              <Button
                sx={{
                  bgcolor: "black",
                }}
                variant="contained"
                size="small"
                onClick={() => handleSubmitFilters()}
              >
                ذخیره تغییرات
              </Button>
            </Box>
          </SwipeableDrawer>
        ) : (
          <Popover
            open={Boolean(anchorEl)}
            // anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                // mt: 8,
                width: "500px",
                maxHeight: "90vh",
                backgroundColor: "#ffff",
                px: 0,
                overflowY: "auto", // Allow vertical scrolling
              },
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-1 bg-white"
            >
              <Box>
                <Typography variant="h5" sx={{ fontSize: "20px" }}>
                  فیلترها
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleClosePopover}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              ref={counterRef}
              sx={{
                mt: 1,
                // padding: "16px",
                width: "100%",
                height: "100%",
                px: 0,
              }}
            >
              <ContainerFilters />
            </Box>

            {/* footer */}
            <Box
              sx={{
                position: "sticky",
                bottom: 0, // Ensure `top` is defined
                zIndex: 100,
              }}
              className="d-flex justify-content-between w-100 px-2 align-items-center py-3 bg-white border-top border-muted"
            >
              <Button
                sx={{
                  color: "black",
                }}
                variant="text"
                size="small"
                onClick={handleDeleteFilters}
              >
                حذف فیلتر
              </Button>
              <Button
                sx={{
                  bgcolor: "black",
                }}
                variant="contained"
                size="small"
                onClick={() => handleSubmitFilters()}
              >
                ذخیره تغییرات
              </Button>
            </Box>
          </Popover>
        )}
      </PopVerFilterContext.Provider>
    </>
  );
};

export default PopVerFilter;
