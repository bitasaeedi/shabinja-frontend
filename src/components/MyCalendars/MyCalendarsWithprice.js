import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";
import {
  GetMiladiStdFunc,
  GetShamsiDateDetails,
} from "../DateFunctions/DateFunctions";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const MyCalendarsWithPrice = ({
  onChange,
  values,
  numMonth = 2,
  listDayesWithPrice = [],
}) => {
  const [startDate, setStartDate] = useState(null); // Track the selected start date

  const onChangeList = (value) => {
    if (Array.isArray(value)) {
      const list = value.map((date) => {
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        return {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
      });

      // Update startDate when a new range is started
      if (value.length === 1) {
        setStartDate(GetMiladiStdFunc(value[0].toJSON()));
      }

      onChange(list);
    }
  };

  // Create a lookup table for quick price checks
  const priceLookup = listDayesWithPrice.reduce((acc, item) => {
    acc[GetMiladiStdFunc(item.start)] = item.priceBase; // Map date to priceBase
    return acc;
  }, {});

  return (
    <Calendar
      className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar-stay"
      value={values}
      format="YYYY/MM/DD"
      fixMainPosition={true}
      fixRelativePosition={true}
      calendarPosition="bottom-right"
      calendar={persian}
      locale={persian_fa}
      onChange={onChangeList}
      numberOfMonths={numMonth}
      disableYearPicker
      disableMonthPicker
      range
      rangeHover
      plugins={[weekends()]}
      animations={[transition()]}
      weekDays={weekDays}
      mapDays={({ date, today }) => {
        const dateKey = GetMiladiStdFunc(date.toJSON());
        const todayKey = GetMiladiStdFunc(today.toJSON());

        const priceBase = priceLookup[dateKey];
        const isWeekend = date.weekDay.index === 6;

        // Combine disabled logic for single days and ranges
        const isDisabled = !priceBase || dateKey < todayKey;

        const additionalText = priceBase ? priceBase.toLocaleString() : "";

        return {
          disabled: isDisabled,
          children: (
            <div
              style={{
                position: "relative",
                color:
                  isDisabled && isWeekend
                    ? "rgba(255, 0, 0, 0.36)"
                    : isWeekend
                    ? "red"
                    : "inherit",
              }}
            >
              {/* مثلث سمت چپ با هاشور */}
              {/* <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "polygon(0 0, 100% 0, 0 100%)", // تعریف مثلث سمت چپ
                background:
                  "repeating-linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 5px)",
              }}
            /> */}
              {/* مثلث سمت راست با هاشور */}
              {/* <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)", // تعریف مثلث سمت راست
                background:
                  "repeating-linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 5px)",
              }}
            /> */}
              <div className="">{date.day}</div>
              <div>
                <small
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {additionalText}
                </small>
              </div>
            </div>
          ),
        };
      }}
    />
  );
};

export default MyCalendarsWithPrice;
