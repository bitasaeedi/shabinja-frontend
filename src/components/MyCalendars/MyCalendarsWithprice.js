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

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const listDayesWithPrice = MyDatesPrice();

const MyCalendarsWithPrice = ({
  onChange,
  values = [],
  numMonth = 2,
  dontDisable = false,
}) => {
  const [dateInfoLookup, setDateInfoLookup] = useState([]);
  // Create a lookup table with standardized date format

  useEffect(() => {
    const dateInfoLookupList = listDayesWithPrice.reduce((acc, item) => {
      const stdDate = GetMiladiStdFunc(item.date); // Convert your data dates to match calendar format
      acc[stdDate] = item;
      // console.info("acc", acc);
      return acc;
    }, {});
    setDateInfoLookup(dateInfoLookupList);
  }, [listDayesWithPrice]);

  const onChangeList = (value) => {
    if (!value) {
      onChange([{}, {}]);
      return;
    }

    // در صورتی که تاریخ دوم کوچک تر از تاریخ اول باشد تاریخ اول را حذف میکند
    if (
      new Date(GetMiladiStdFunc(new Date(value[0].toJSON()))) <
      new Date(ConvertShamsiToMiladi(values[0]))
    ) {
      const firstItem = value[0];
      const miladi = GetMiladiStdFunc(new Date(firstItem.toJSON()));
      onChange([
        {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        },
        ,
        {},
      ]);
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 1) {
        const firstItem = value[0];
        const miladi = GetMiladiStdFunc(new Date(firstItem.toJSON()));

        // اگر شروع بازه با یک تاریخ غیر قابل انتخاب بود بازه رو پاک کن.
        if (handleCheckDisableDate(miladi, true)) {
          onChange([{}, {}]);
          return;
        }

        var list = [
          {
            miladi,
            shamsiObj: GetShamsiDateDetails(miladi),
          },
        ];
        onChange(list);
      } else if (value.length === 2) {
        if (
          GetMiladiStdFunc(new Date(value[0].toJSON())) ===
          GetMiladiStdFunc(new Date(value[1].toJSON()))
        ) {
          onChange([]);
          return;
        }

        var list = value
          .map((date) => {
            if (!date) return null;
            const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
            return {
              miladi,
              shamsiObj: GetShamsiDateDetails(miladi),
            };
          })
          .filter(Boolean);
        onChange(list);
      }
    }
  };

  const handleCheckDisableDate = (dateToCheck, doNotCheck) => {
    if (!dateToCheck) return true;

    if (dontDisable) return false;
    const dateInfo = dateInfoLookup[dateToCheck];

    // If no initial date is selected, only disable unavailable dates
    if (!values?.length || !values[0]) {
      return !dateInfo || (dateInfo.is_unavailable && !dontDisable);
    }

    // Start date
    const startDateMiladiStr = ConvertShamsiToMiladi(values[0]);
    const startDate = new Date(startDateMiladiStr);
    const currentDate = new Date(dateToCheck);

    // Find first unavailable date after start date
    const sortedKeys = Object.keys(dateInfoLookup).sort();
    let firstUnavailableAfterStart = null;

    for (const key of sortedKeys) {
      const loopDate = new Date(key);
      if (loopDate > startDate && dateInfoLookup[key]?.is_unavailable) {
        firstUnavailableAfterStart = key; // Keep as string for consistent comparison
        break;
      }
    }

    // Special case: allow selecting the first unavailable date after start
    if (
      firstUnavailableAfterStart &&
      firstUnavailableAfterStart === dateToCheck &&
      values[0] &&
      !doNotCheck
    ) {
      return false; // Enable this date for selection
    }

    // Disable all dates after the first unavailable date (when only start date is selected)
    if (
      firstUnavailableAfterStart &&
      currentDate > new Date(firstUnavailableAfterStart) &&
      !values[1]
    ) {
      return true;
    }

    // If current date is unavailable, disable it (unless dontDisable is true)
    if (dateInfo?.is_unavailable) {
      return !dontDisable;
    }

    // If current date is exactly one day before first unavailable date, allow it
    if (firstUnavailableAfterStart) {
      const prevDay = new Date(
        new Date(firstUnavailableAfterStart).getTime() - 86400000
      );
      if (currentDate.getTime() === prevDay.getTime()) {
        return false;
      }
    }

    // Default case: disable if date doesn't exist in our data
    return !dateInfo;
  };

  const getDateStyle = (dateKey, isWeekend, isDisabled, isSelected) => {
    const dateInfo = dateInfoLookup[dateKey];

    let style = {
      color: "inherit",
      background: "inherit",
      fontWeight: "normal",
    };

    if (isDisabled) {
      style.color = "#ccc";
      // style.opacity = 0.6;
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
      if (dateInfo.is_holiday) {
        style.color = "red";
        style.fontWeight = "bold";
      }

      // پیک
      if (dateInfo.is_peak) {
        style.fontWeight = "bold";
        // style.color = "red";
      }

      if (dateInfo.is_instant) {
        style.fontWeight = "bold";
        // style.color = "#4caf50";
      }
    }

    return style;
  };

  return (
    <Calendar
      className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar-stay"
      value={values}
      format="YYYY/MM/DD"
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
        const isWeekend = date.weekDay.index === 6;
        const isDisabled = handleCheckDisableDate(dateKey);
        const dateInfo = dateInfoLookup[dateKey];
        const price = dateInfo?.price;

        const isSelected = values?.some((val) => {
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
        const finalDisable = isDisabled || today > date || !dateInfo;
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
          children: (
            // <>
            <div
              style={{
                position: "relative",
              }}
            >
              {/* مثلث سمت چپ با هاشور */}
              {dateInfo?.is_unavailable &&
                price &&
                isDisabled &&
                today <= date && (
                  <>
                    <div
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
                    />
                    {/* مثلث سمت راست با هاشور */}
                    <div
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
                    />
                  </>
                )}
              <div>{date.day}</div>
              {price && (
                <small style={{ fontSize: "10px" }}>
                  {Math.floor(price / 10000)} هزار
                </small>
              )}
              {!dateInfo && today <= date && (
                <small style={{ fontSize: "10px" }}>بزودی</small>
              )}
            </div>
            // </>
          ),
        };
      }}
    />
  );
};

export default MyCalendarsWithPrice;
