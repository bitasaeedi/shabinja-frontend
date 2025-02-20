import { Box, Container, Grid, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../layout/header/Header";

import { AppContext } from "../../App";
import MyCalendarsWithPrice from "../../components/MyCalendars/MyCalendarsWithprice";
import ChangePriceButton from "./ChangePriceButton/ChangePriceButton";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

export const EditCalendarPageContext = createContext();

const listButtons = [
  {
    title: "تغییر قیمت",
    component: <h1>change price</h1>,
    icon: <PriceChangeIcon />,
  },
  {
    title: "پر و خالی ",
    component: <h1>پر و خالی</h1>,
    icon: <PriceChangeIcon />,
  },
  {
    title: "تخفیف عادی",
    component: <h1>تخفیف</h1>,
    icon: <PriceChangeIcon />,
  },
  {
    title: " لحظه اخری",
    component: <h1>لحظه آخری </h1>,
    icon: <PriceChangeIcon />,
  },
  {
    title: "رزرو آنی",
    component: <h1>change price</h1>,
    icon: <PriceChangeIcon />,
  },
  {
    title: "حداقل روز رزرو",
    component: <h1>change price</h1>,
    icon: <PriceChangeIcon />,
  },
];
const EditCalendarPage = () => {
  const { staycode } = useParams();
  const appContext = useContext(AppContext);
  const [selectedDays, setSelectedDays] = useState([]);
  const [priceHostTours, setPriceHostTours] = useState([]);

  useEffect(() => {
    appContext.setShowfooter(false);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
    });
  }, []);
  const handleChangeDate = (newList) => {
    setSelectedDays(newList);
  };
  return (
    <EditCalendarPageContext.Provider
      value={{
        staycode,
      }}
    >
      {/* <Header showMobileHeader={false} /> */}
      <Box
        sx={{
          height: { xs: 9, md: 100 }, // Adjust header space for xs and md screens
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
              listDayesWithPrice={priceHostTours}
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
              listDayesWithPrice={priceHostTours}
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
              listDayesWithPrice={priceHostTours}
            />
          </Box>
        </Box>

        <Box sx={{}}>
          <Grid container>
            {listButtons?.map((buttonDetails, index) => (
              <Grid
                item
                xs="6"
                md="4"
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  my: 1,
                }}
              >
                <ChangePriceButton item={buttonDetails} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </EditCalendarPageContext.Provider>
  );
};

export default EditCalendarPage;
