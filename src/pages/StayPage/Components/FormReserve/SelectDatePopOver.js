import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";
import {
  GetMiladiStdFunc,
  GetShamsiDateDetails,
} from "../../../../components/DateFunctions/DateFunctions";
import {
  Box,
  Divider,
  IconButton,
  Popover,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DesctopSelectDate from "./DesctopSelectDate";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function SelectDatePopOver({
  callBackFunc,
  valueDefault = [],
  anchorEl,
  handleClosePopover,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [values, setValues] = useState(valueDefault);
  const calendarRef = useRef();

  useEffect(() => {
    setValues(valueDefault);
  }, [valueDefault]);

  const onChange = (value) => {
    callBackFunc(value);
  };

  return isMobile ? (
    <></>
  ) : (
    <DesctopSelectDate
      anchorEl={anchorEl}
      handleClosePopover={handleClosePopover}
      onChange={onChange}
      values={values}
    />
  );
}

export default SelectDatePopOver;
