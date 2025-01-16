import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";
import {
  ConvertShamsiToMiladi,
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
  const onChangeList = (value) => {
    if (Array.isArray(value)) {
      if (
        value.length === 2 &&
        GetMiladiStdFunc(new Date(value[0].toJSON())) ===
          GetMiladiStdFunc(new Date(value[1].toJSON()))
      ) {
        const firstItem = value[0];
        const miladi = GetMiladiStdFunc(new Date(firstItem.toJSON()));
        const list = [
          {
            miladi,
            shamsiObj: GetShamsiDateDetails(miladi),
          },
        ];
        onChange(list);
      } else {
        // Process the list as usual if the condition is not met
        const list = value.map((date) => {
          const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
          return {
            miladi,
            shamsiObj: GetShamsiDateDetails(miladi),
          };
        });
        onChange(list);
      }
    }
  };

  // Create a lookup table for quick price checks
  const priceLookup = listDayesWithPrice.reduce((acc, item) => {
    acc[GetMiladiStdFunc(item.start)] = item.priceBase; // Map date to priceBase
    return acc;
  }, {});

  const handleCheckDisableDate = (dateToCheck) => {
    const priceBase = priceLookup[dateToCheck];

    if (!dateToCheck) {
      return false;
    }
    // if (!values[0] || values[1]) {
    //   return false;
    // }

    // // Convert dates to Date objects
    var startDates = ConvertShamsiToMiladi(values[0]);
    startDates = new Date(startDates);

    var endDate = new Date(dateToCheck);

    var dates = listDayesWithPrice;

    // // // Ensure the start date is smaller than the end date
    if (startDates > endDate) {
      [startDates, endDate] = [endDate, startDates]; // Swap them
    }

    // برای اینکه نتواند دو روز را انتخاب کند
    // if (startDates.toDateString() === endDate.toDateString()) {
    //   return true;
    // }
    // // // Create a set of the given dates for fast lookup
    const dateSet = new Set(
      dates.map((date) => new Date(date?.start).toDateString())
    );

    // // Check every date in the period
    let currentDate = new Date(startDates);
    while (currentDate <= endDate) {
      if (!priceBase && currentDate.toDateString() === endDate.toDateString()) {
        return false;
      }
      if (!dateSet.has(currentDate.toDateString())) {
        return true;
      }
      // Increment the date by 1 day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return !priceBase;
  };
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
        const disableChack = handleCheckDisableDate(dateKey);

        var isDisabled = dateKey < todayKey || disableChack;

        const additionalText = priceBase ? priceBase.toLocaleString() : "";
        var selectedDate = false;
        if (
          new Date(ConvertShamsiToMiladi(values[0])).toDateString() ===
          new Date(dateKey).toDateString()
        ) {
          selectedDate = true;
          // console.log(selectedDate, "selectedDate");
        }

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
                  {additionalText.toString().slice(0, -4)}
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
