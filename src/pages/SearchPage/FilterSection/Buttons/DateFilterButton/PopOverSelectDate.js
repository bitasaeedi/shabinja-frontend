import React, { useEffect, useRef } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";
import {
  GetMiladiStdFunc,
  GetShamsiDateDetails,
} from "../../../../../components/DateFunctions/DateFunctions";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function PopOverSelectDate({ callBackFunc }) {
  const calendarRef = useRef();

  //   const onChange = (value) => {
  //     if (value) {
  //       const day = value.day; // Day of the month
  //       const month = value.month.name; // Month name
  //       const year = value.year; // Year

  //       returnDate({ day, month, year, completDate: value.format() });
  //     }
  //   };

  const onChange = (value) => {
    // Log the formatted value of each selected date
    if (Array.isArray(value)) {
      var list = [];
      value.forEach((date) => {
        const day = date.day; // Day of the month
        const month = date.month.name; // Month name
        const year = date.year; // Year
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        const valueObj = {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
        console.log(GetShamsiDateDetails(miladi), "miladi");
        list.push(valueObj);
      });
      callBackFunc(list);
    } else {
      console.log(value.toObject(), "calender normal"); // For single date selection
      // returnDate(value.format());
    }
  };

  return (
    <div ref={calendarRef}>
      <Calendar
        format="YYYY/MM/DD" // Set the desired format directly
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        onChange={onChange}
        numberOfMonths={2}
        disableYearPicker
        disableMonthPicker
        range
        // rangeHover
        plugins={[weekends()]}
        animations={[transition()]}
        weekDays={weekDays}
        mapDays={({ date, today }) => {
          if (date < today)
            return {
              disabled: true,
              style: { color: "#ccc" },
              //   onClick: () => alert(" غیر فعال هستند"),
            };
        }}
      />
    </div>
  );
}

export default PopOverSelectDate;
