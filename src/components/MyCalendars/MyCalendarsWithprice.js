import React, { useEffect, useRef, useState } from "react";
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
const MyCalendarsWithprice = ({ onChange, values, numMonth = 2 }) => {

  const onChangeList = (value) => {
    if (Array.isArray(value)) {
      const list = value.map((date) => {
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        return {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
      });
      onChange(list);
    } else {
      console.log(value.toObject(), "calendar normal");
    }
  }
  return (
    <Calendar
      style={
        {
          // height: 600,
        }
      }
      className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar-stay"
      value={values}
      format="YYYY/MM/DD"
      fixMainPosition={true}
      fixRelativePosition={true}
      // offsetY={5}
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
      mapDays={({ date, today, selectedDate, isSameDate }) => {
        let isWeekend = date.weekDay.index === 6;
        const additionalText = `1،450`; // مبلغی که هر روز خواهد گرفت
        return {
          disabled:
            GetMiladiStdFunc(date.toJSON()) <
              GetMiladiStdFunc(today.toJSON()) 
              ? true
              : false,
          children: (
            <div
              style={{
                position: "relative",
                color:
                  GetMiladiStdFunc(date.toJSON()) <
                    GetMiladiStdFunc(today.toJSON()) && isWeekend
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
                <small className="">{additionalText}</small>
              </div>
            </div>
          ),
        };
      }}
    />
  );
};

export default MyCalendarsWithprice;
