import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../layout/header/Header";

import { AppContext } from "../../App";
import MyCalendarsWithPrice from "../../components/MyCalendars/MyCalendarsWithprice";
import ChangePriceButton from "./ChangePriceButton/ChangePriceButton";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ChangePrice from "./Components/ChangePrice";
import LastMin from "./Components/LastMin";
import InstantBooking from "./Components/InstantBooking";
import MinMaxDay from "./Components/MinMaxDay";
import Accessibility from "./Components/Accessibility";
import Discount from "./Components/Discount";
import PeakDays from "./Components/PeakDays";
import { PriceHostTourListApi } from "../../api/toureApis";
<<<<<<< Updated upstream
import PopOverHandle from "./ChangePriceButton/PopOverHandle";
import ShowValues from "./Components/ShowValues";
=======
import moment from "moment-jalaali";
>>>>>>> Stashed changes

export const EditCalendarPageContext = createContext();

const listButtons = [
  {
    title: "تغییر قیمت",
    component: <h1>تغییر قیمت</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <ChangePrice {...props} />,
  },
  {
    title: "پر و خالی ",
    component: <h1>پر و خالی</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <Accessibility {...props} />,
  },
  {
    title: "تخفیف عادی",
    component: <h1>تخفیف</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <Discount {...props} />,
  },
  {
    title: "لحظه آخری",
    component: <h1>لحظه آخری </h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <LastMin {...props} />,
  },
  {
    title: "رزرو آنی",
    component: <h1>رزرو آنی</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <InstantBooking {...props} />,
  },
  {
    title: "حداقل و حداکثر روز رزرو",
    component: <h1>حداقل و حداکثر روز رزرو</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <MinMaxDay {...props} />,
  },
  {
    title: "ایام پیک",
    component: <h1>ایام پیک</h1>,
    icon: <PriceChangeIcon />,
    element: (props) => <PeakDays {...props} />,
  },
];

const EditCalendarPage = () => {
  const { staycode } = useParams();
  const appContext = useContext(AppContext);
  const [selectedDays, setSelectedDays] = useState([]);
  const [priceHostTours, setPriceHostTours] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    appContext.setShowfooter(false);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
    });
  }, []);

  useEffect(() => {
    handleGetListPrice();
  }, [staycode]);

  const handleChangeDate = (listDate) => {
    const valueOfFilter = listDate[0]?.shamsiObj?.fullshamsi || undefined;
    const valueOfFilter2 = listDate[1]?.shamsiObj?.fullshamsi || undefined;
    setSelectedDays([valueOfFilter, valueOfFilter2]);

    // console.log(newList , "handleChangeDate");
    // setSelectedDays(newList);
  };

  const handleGetListPrice = async () => {
<<<<<<< Updated upstream
    const result = await PriceHostTourListApi(staycode);
    setPriceHostTours(result?.data);
  };

  // show values
  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Open popover only if not active
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

=======
    const now = moment();
    const numMonth = now.jMonth() + 1; // jMonth() returns 0-11, so +1 to get 1-12

    // Calculate months with overflow
    const months = [
      numMonth,
      numMonth + 1 > 12 ? numMonth + 1 - 12 : numMonth + 1,
      numMonth + 2 > 12 ? numMonth + 2 - 12 : numMonth + 2,
    ];

    const result = await PriceHostTourListApi(staycode, months[0]);
    const result2 = await PriceHostTourListApi(staycode, months[1]);
    const result3 = await PriceHostTourListApi(staycode, months[2]);

    var month1 = result?.data || [];
    var month2 = result2?.data || [];
    var month3 = result3?.data || [];
    
    const myList = [...month1, ...month2, ...month3];
    setPriceHostTours(myList);
  };

  // const handleGetListPrice = async () => {
  //   const result = await PriceHostTourListApi(staycode);
  //   setPriceHostTours(result?.data);
  // };
>>>>>>> Stashed changes
  return (
    <EditCalendarPageContext.Provider
      value={{
        staycode,
        selectedDays,
      }}
    >
      {/* <Header showMobileHeader={false} /> */}
      <Box
        sx={{
          height: { xs: 9, md: 100 },
          // Adjust header space for xs and md screens
        }}
      ></Box>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          mx: "auto",
        }}
      >
        <Box>
          <Box
            sx={{
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            <MyCalendarsWithPrice
              numMonth={3}
              onChange={handleChangeDate}
              values={selectedDays}
              listDayesWithPrice={priceHostTours || []}
              dontDisable={true}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex", lg: "none" },
            }}
          >
            <MyCalendarsWithPrice
              numMonth={2}
              onChange={handleChangeDate}
              values={selectedDays}
              listDayesWithPrice={priceHostTours || []}
              dontDisable={true}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none", lg: "none" },
            }}
          >
            <MyCalendarsWithPrice
              numMonth={1}
              onChange={handleChangeDate}
              values={selectedDays}
              listDayesWithPrice={priceHostTours || []}
              dontDisable={true}
            />
          </Box>
        </Box>

        <Box sx={{}}>
          <Grid container>
            {listButtons?.map((buttonDetails, index) => {
              const isLastOddItem = index === listButtons.length - 1;

              return (
                <Grid
                  item
                  xs={isLastOddItem ? 12 : 6}
                  md={isLastOddItem ? 12 : 4}
                  key={index}
                  b={isLastOddItem ? "1px solid blue" : " 1px solid red"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 1,
                  }}
                >
                  <ChangePriceButton item={buttonDetails} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {/* show values */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "2rem",
          }}
        >
          <Button variant="contained" onClick={handleButtonClick}>
            مشاهده مقادیر
          </Button>
        </Box>

        <PopOverHandle
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
          popWidth={800}
          vertical={"top"}
        >
          {"مشاهده مقادیر"}
          <ShowValues staycode={staycode}/>
        </PopOverHandle>

      </Box>
    </EditCalendarPageContext.Provider>
  );
};

export default EditCalendarPage;
