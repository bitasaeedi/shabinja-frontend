import React, { useEffect, useState } from "react";
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
import MyDatesPrice from "../../myDatas/MyDatesPrice";

// Constants
const WEEK_DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"]; // Persian week day abbreviations
const DAY_IN_MS = 86400000; // Milliseconds in a day

/**
 * A customizable calendar component with price display and date range selection
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Callback when dates change
 * @param {Array} [props.values=[]] - Selected date values
 * @param {number} [props.numMonth=2] - Number of months to display
 * @param {boolean} [props.dontDisable=false] - Whether to disable date validation
 */
const MyCalendarsWithPrice = ({
  onChange,
  values = [],
  numMonth = 2,
  dontDisable = false,
  listDayesWithPrice = [],
}) => {
  // State
  const [dateInfoLookup, setDateInfoLookup] = useState({});
  // const listDayesWithPrice = MyDatesPrice(); // Get dates with price data

  // Effects
  useEffect(() => {
    /**
     * Create a lookup table for date information with standardized date format
     */
    const createDateInfoLookup = () => {
      const lookup = listDayesWithPrice.reduce((acc, item) => {
        const stdDate = GetMiladiStdFunc(item.date);
        acc[stdDate] = item;
        return acc;
      }, {});
      setDateInfoLookup(lookup);
    };

    createDateInfoLookup();
  }, [listDayesWithPrice]);

  // Event Handlers
  const handleDateChange = (value) => {
    /**
     * Handle date selection changes and validate selections
     */
    if (!value) {
      onChange([{}, {}]);
      return;
    }

    // If second date is earlier than first date, replace the first date
    if (
      values[0] &&
      new Date(GetMiladiStdFunc(new Date(value[0].toJSON()))) <
        new Date(ConvertShamsiToMiladi(values[0]))
    ) {
      updateSingleDateSelection(value[0]);
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 1) {
        handleSingleDateSelection(value[0]);
      } else if (value.length === 2) {
        handleDateRangeSelection(value);
      }
    }
  };

  /**
   * Handle selection of a single date
   * @param {Object} date - Selected date object
   */
  const handleSingleDateSelection = (date) => {
    const miladi = GetMiladiStdFunc(new Date(date.toJSON()));

    // Clear selection if the date is disabled
    if (handleCheckDisableDate(miladi, true)) {
      onChange([{}, {}]);
      return;
    }

    onChange([
      {
        miladi,
        shamsiObj: GetShamsiDateDetails(miladi),
      },
    ]);
  };

  /**
   * Handle selection of a date range
   * @param {Array} dates - Array of two date objects
   */
  const handleDateRangeSelection = (dates) => {
    // If both dates are the same, clear selection
    if (
      GetMiladiStdFunc(new Date(dates[0]?.toJSON())) ===
      GetMiladiStdFunc(new Date(dates[1]?.toJSON()))
    ) {
      onChange([]);
      return;
    }

    const selectedDates = dates
      .map((date) => {
        if (!date) return null;
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        return {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
      })
      .filter(Boolean);

    onChange(selectedDates);
  };

  /**
   * Update selection with a single date
   * @param {Object} date - Date object to select
   */
  const updateSingleDateSelection = (date) => {
    const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
    onChange([
      {
        miladi,
        shamsiObj: GetShamsiDateDetails(miladi),
      },
      {},
    ]);
  };

  // Date Validation
  const handleCheckDisableDate = (dateToCheck, doNotCheck = false) => {
    /**
     * Check if a date should be disabled based on availability and business rules
     * @param {string} dateToCheck - Date string to check
     * @param {boolean} doNotCheck - Skip some validation checks
     * @returns {boolean} Whether the date should be disabled
     */
    if (!dateToCheck) return true;
    if (dontDisable) return false;

    const dateInfo = dateInfoLookup[dateToCheck];
    const currentDate = new Date(dateToCheck);

    // If no initial date is selected, only disable unavailable dates
    if (!values?.length || !values[0]) {
      return !dateInfo || (dateInfo.notAvailable && !dontDisable);
    }

    const startDate = new Date(ConvertShamsiToMiladi(values[0]));
    const sortedDates = Object.keys(dateInfoLookup).sort();

    // Find first unavailable date after start date
    const firstUnavailableAfterStart = findFirstUnavailableDate(
      sortedDates,
      startDate
    );

    // Special case: allow selecting the first unavailable date after start
    if (
      firstUnavailableAfterStart &&
      firstUnavailableAfterStart === dateToCheck &&
      values[0] &&
      !doNotCheck
    ) {
      return false;
    }

    // Disable all dates after the first unavailable date
    if (
      firstUnavailableAfterStart &&
      currentDate > new Date(firstUnavailableAfterStart) &&
      !values[1]
    ) {
      return true;
    }

    // Disable unavailable dates
    if (dateInfo?.notAvailable) {
      return !dontDisable;
    }

    // Allow selecting the day before first unavailable date
    if (
      firstUnavailableAfterStart &&
      currentDate.getTime() ===
        new Date(firstUnavailableAfterStart).getTime() - DAY_IN_MS
    ) {
      return false;
    }

    // Default case: disable if date doesn't exist in our data
    return !dateInfo;
  };

  /**
   * Find the first unavailable date after the start date
   * @param {Array} sortedDates - Sorted array of date strings
   * @param {Date} startDate - Start date to compare against
   * @returns {string|null} First unavailable date string or null
   */
  const findFirstUnavailableDate = (sortedDates, startDate) => {
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      if (date > startDate && dateInfoLookup[dateStr]?.notAvailable) {
        return dateStr;
      }
    }
    return null;
  };

  // Date Styling
  const getDateStyle = (dateKey, isWeekend, isDisabled, isSelected) => {
    /**
     * Get style object for a date cell based on its state
     */
    const dateInfo = dateInfoLookup[dateKey];
    const style = {
      color: "inherit",
      background: "inherit",
      fontWeight: "normal",
    };

    if (isDisabled) {
      style.color = "#ccc";
      return style;
    }

    if (isSelected) {
      style.background = "#3f51b5";
      style.color = "white";
      return style;
    }

    if (isWeekend) {
      style.color = "red";
    }

    if (dateInfo) {
      if (dateInfo.holiday) {
        style.color = "red";
        style.fontWeight = "bold";
      }

      if (dateInfo.is_peak) {
        style.fontWeight = "bold";
      }

      if (dateInfo.instantBooking) {
        style.fontWeight = "bold";
      }
    }

    return style;
  };

  // Render
  return (
    <Calendar
      className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar-stay"
      value={values}
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      onChange={handleDateChange}
      numberOfMonths={numMonth}
      disableYearPicker
      disableMonthPicker
      range
      rangeHover
      plugins={[weekends()]}
      animations={[transition()]}
      weekDays={WEEK_DAYS}
      mapDays={({ date, today }) => {
        const dateKey = GetMiladiStdFunc(date.toJSON());
        const isWeekend = date.weekDay.index === 6;
        const isDisabled = handleCheckDisableDate(dateKey);
        const dateInfo = dateInfoLookup[dateKey];
        const price = dateInfo?.price;

        const isSelected = checkIfDateIsSelected(dateKey, values);

        const todayDate = new Date(today);
        todayDate.setHours(0, 0, 0, 0);

        const dateToCompare = new Date(date);
        dateToCompare.setHours(0, 0, 0, 0);

        const finalDisable =
          isDisabled || todayDate > dateToCompare || !dateInfo;
        const style = getDateStyle(
          dateKey,
          isWeekend,
          finalDisable,
          isSelected
        );

        return {
          disabled: finalDisable,
          style: {
            ...style,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 0,
          },
          children: renderDateCell(date, dateInfo, price, today, isDisabled),
        };
      }}
    />
  );
};

/**
 * Check if a date is in the selected values
 * @param {string} dateKey - Date string to check
 * @param {Array} values - Selected values array
 * @returns {boolean} Whether the date is selected
 */
const checkIfDateIsSelected = (dateKey, values) => {
  return values?.some((val) => {
    if (!val) return false;

    try {
      const valDate =
        typeof val === "string"
          ? GetMiladiStdFunc(ConvertShamsiToMiladi(val))
          : val.toJSON
          ? GetMiladiStdFunc(val.toJSON())
          : null;

      return valDate === dateKey;
    } catch (e) {
      return false;
    }
  });
};

/**
 * Render the content of a date cell
 * @param {Object} date - Date object
 * @param {Object} dateInfo - Date information object
 * @param {number} price - Price for the date
 * @param {Date} today - Today's date
 * @param {boolean} isDisabled - Whether the date is disabled
 * @returns {JSX.Element} Date cell content
 */
const renderDateCell = (date, dateInfo, price, today, isDisabled) => {
  return (
    <div style={{ position: "relative",  width:"100%"   }}>
      {renderUnavailablePattern(dateInfo, price, isDisabled, today, date)}
      <div>{date.day}</div>
      {renderDateMetaInfo(price, dateInfo, today, date)}
    </div>
  );
};

/**
 * Render diagonal pattern for unavailable dates
 */
const renderUnavailablePattern = (dateInfo, price, isDisabled, today, date) => {
  if (!dateInfo?.notAvailable || !price || !isDisabled || today > date) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          background:
            "repeating-linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 5px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          background:
            "repeating-linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 5px)",
        }}
      />
    </>
  );
};

/**
 * Render price or "coming soon" text for a date
 */
const renderDateMetaInfo = (price, dateInfo, today, date) => {
  if (price) {
    return (
      <small style={{ fontSize: "10px" }}>
        {Math.floor(price / 10).toLocaleString()}
      </small>
    );
  }

  if (!dateInfo && today <= date) {
    return <small style={{ fontSize: "10px" }}>بزودی</small>;
  }

  return null;
};

export default MyCalendarsWithPrice;
