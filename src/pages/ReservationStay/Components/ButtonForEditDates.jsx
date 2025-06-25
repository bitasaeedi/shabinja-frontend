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
import MyDatesPrice from "../../../myDatas/MyDatesPrice";
import { Close } from "@mui/icons-material"; // Using icons for better UX

const ButtonForEditDates = () => {
  const theme = useTheme();
  const { handleSetParams, paramsValues } = useContext(ReservationStayContext);

  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [valuesDate, setValuesDate] = useState([]);
  const handleDateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

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
            listDayesWithPrice={MyDatesPrice()}
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
          listDayesWithPrice={MyDatesPrice()}
        />
      )}
    </>
  );
};

export default ButtonForEditDates;
