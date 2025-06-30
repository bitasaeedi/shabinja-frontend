import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SelectDatePopOver from "../../StayPage/Components/FormReserve/SelectDatePopOver";
import MobilePopOverDateSelect from "../../StayPage/Components/MobileForm/components/MobilePopOverDateSelect";
import { ReservationStayContext } from "../ReservationStay";

import { Close } from "@mui/icons-material"; // Using icons for better UX
import { PriceHostTourListApi } from "../../../api/toureApis";
import moment from "moment-jalaali";

const ButtonForEditDates = () => {
  const theme = useTheme();
  const { handleSetParams, paramsValues, code, stepName } = useContext(
    ReservationStayContext
  );

  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [listPrices, setListPrices] = useState([]);

  const [valuesDate, setValuesDate] = useState([]);
  const handleDateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (code && stepName === "preview") {
      handleGetListPrice();
    }
  }, [code, stepName]);

  useEffect(() => {
    setValuesDate([paramsValues?.start, paramsValues?.end]);
  }, [paramsValues]);

  const handleChangeDates = (listDate) => {
    const valueOfFilter = listDate[0]?.shamsiObj?.fullshamsi || undefined;
    const valueOfFilter2 = listDate[1]?.shamsiObj?.fullshamsi || undefined;
    setValuesDate([valueOfFilter, valueOfFilter2]);

    console.log(valueOfFilter, "valueOfFilter", listDate, valueOfFilter2);
    if (valueOfFilter && valueOfFilter2) {
      handleSetParams("start", valueOfFilter);
      handleSetParams("end", valueOfFilter2);
      handleClosePopover();
    }
  };

  const handleGetListPrice = async () => {
    const now = moment();
    const numMonth = now.jMonth() + 1; // jMonth() returns 0-11, so +1 to get 1-12

    // Calculate months with overflow
    const months = [
      numMonth,
      numMonth + 1 > 12 ? numMonth + 1 - 12 : numMonth + 1,
      numMonth + 2 > 12 ? numMonth + 2 - 12 : numMonth + 2,
    ];

    const result = await PriceHostTourListApi(code, months[0]);
    const result2 = await PriceHostTourListApi(code, months[1]);
    const result3 = await PriceHostTourListApi(code, months[2]);

    var month1 = result?.data || [];
    var month2 = result2?.data || [];
    var month3 = result3?.data || [];
    const myList = [...month1, ...month2, ...month3];
    setListPrices(myList);
    console.log(month1, "month1");
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          onClick={handleDateClick}
          sx={{ backgroundColor: "grey.100", color: "black" }}
        >
          ویرایش
        </Button>

        {anchorEl && (
          <SelectDatePopOver
            callBackFunc={handleChangeDates}
            valueDefault={valuesDate}
            //   anchorEl={anchorEl}
            handleClosePopover={handleClosePopover}
            listDayesWithPrice={listPrices}
            centerPage={true}
            headerComponent={
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontsize: 20 }}
                >
                  تاریخ ورود و خروج جدید را انتخاب کنید
                </Typography>
                <IconButton onClick={handleClosePopover} size="small">
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        )}
      </Box>
      {anchorEl && isMobile && (
        <MobilePopOverDateSelect
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
          onChange={handleChangeDates}
          values={valuesDate}
          listDayesWithPrice={listPrices}
        />
      )}
    </>
  );
};

export default ButtonForEditDates;
