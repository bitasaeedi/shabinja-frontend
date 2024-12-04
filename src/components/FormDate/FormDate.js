import React, { useEffect, useRef } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function FormDate({ returnDate, closePopup }) {
  const calendarRef = useRef();

  // Handle click outside to close calendar
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
      returnDate({ day, month, year, completDate: value.format() });
    }
  };

  // const onChange = (value) => {
  //   // Log the formatted value of each selected date
  //   if (Array.isArray(value)) {
  //     value.forEach((date) => {
  //       console.log(date.format(), "calender list"); // Use the format() method to get the formatted date
  //     });
  //   } else {
  //     console.log(value.format(), "calender normal"); // For single date selection
  //     returnDate(value.format());
  //   }
  // };

  return (
    <div ref={calendarRef}>
      <Calendar
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
        mapDays={({ date, today }) => {
          //   let isWeekend = [0, 6].includes(date.weekDay.index);

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

export default FormDate;
