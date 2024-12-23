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

function FormDate({ returnDate, closePopup, valueDefault }) {
  const calendarRef = useRef();
  const [values, setValues] = useState(valueDefault);
  // Handle click outside to close calendar

  useEffect(() => {
    setValues(valueDefault);
  }, [valueDefault]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        closePopup(); // Close the popup if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  const onChange = (value) => {
    if (value) {
      const day = value.day; // Day of the month
      const month = value.month.name; // Month name
      const year = value.year; // Year

      // Return separate values
      const miladi = GetMiladiStdFunc(new Date(value.toJSON()));
      const valueObj = {
        miladi,
        shamsiObj: GetShamsiDateDetails(miladi),
      };

      returnDate(valueObj);
      // { day, month, year, completDate: value.format() }
    }
  };

  return (
    <div ref={calendarRef}>
      <Calendar
        //  value={values}
        className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar"
        format="YYYY/MM/DD" // Set the desired format directly
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        onChange={onChange}
        // numberOfMonths={2}
        disableYearPicker
        disableMonthPicker
        // range
        plugins={[weekends()]}
        animations={[transition()]}
        weekDays={weekDays}
        mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
          let isWeekend = date.weekDay.index === 6;
          if (isWeekend) {
            return {
              style: { color: "red" },
            };
          }
          if (
            GetMiladiStdFunc(date.toJSON()) < GetMiladiStdFunc(today.toJSON())
          ) {
            return {
              disabled: true,
              style: { color: "#ccc" },
            };
          } else {
            return {
              style: {},
            };
          }
        }}
      />
    </div>
  );
}

export default FormDate;
