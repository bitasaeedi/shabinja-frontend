import jalaali from "jalaali-js";
import moment from "moment-jalaali";

export const GetMiladiStdFunc = (dateMiladi) => {
  const d = new Date(dateMiladi);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Add leading zero to single-digit months
  const day = String(d.getDate()).padStart(2, "0"); // Add leading zero to single-digit days
  return `${year}/${month}/${day}`;
};

export const GetShamsiDateDetails = (miladiDate) => {
  if (!miladiDate) {
    return null;
  }

  const date = new Date(miladiDate); 
  if (isNaN(date.getTime())) {
    return null;
  }

  const jalaaliDate = jalaali.toJalaali(date); // Convert to Shamsi date

  const shamsiMonthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const details = {
    year: jalaaliDate.jy, // Shamsi year
    monthNumber: jalaaliDate.jm, // Shamsi month number
    monthName: shamsiMonthNames[jalaaliDate.jm - 1], // Shamsi month name
    day: jalaaliDate.jd, // Day of the month
    dayOfWeek: date.toLocaleDateString("fa-IR", { weekday: "long" }), // Persian day of the week
    title: `${jalaaliDate.jd} ${shamsiMonthNames[jalaaliDate.jm - 1]} ${
      jalaaliDate.jy
    }`, // Full date in readable format
    fullshamsi: `${jalaaliDate.jy}/${String(jalaaliDate.jm).padStart(
      2,
      "0"
    )}/${String(jalaaliDate.jd).padStart(2, "0")}`,
  };

  return details;
};

export const ConvertShamsiToMiladi = (shamsiDate) => {
  if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(shamsiDate)) {
    return "";
  }
  // Split the input date to extract year, month, and day
  const [jy, jm, jd] = shamsiDate.split("/").map(Number);

  // Convert to Gregorian using jalaali-js
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  // Format the Gregorian date in "YYYY/MM/DD"
  const formattedDate = `${gy}/${String(gm).padStart(2, "0")}/${String(
    gd
  ).padStart(2, "0")}`;

  return formattedDate;
};

export const ShamsiToMoreShamsiDetails = (shamsi) => {
  const miladi = ConvertShamsiToMiladi(shamsi);
  return GetShamsiDateDetails(miladi);
};

export const CalculateNights = (shamsiEntryDate, shamsiExitDate) => {
  // Convert Shamsi dates to Miladi moment objects
  const entryDate = moment(shamsiEntryDate, "jYYYY/jMM/jDD");
  const exitDate = moment(shamsiExitDate, "jYYYY/jMM/jDD");

  // Calculate difference in days (nights = days - 1)
  const nights = exitDate.diff(entryDate, "days");

  return nights > 0 ? nights : 0;
};

export const HandleShowDateLikeStr = (shamsidate) => {
  moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });
  const mStartDate = moment(shamsidate, "jYYYY/jMM/jDD");
  const formattedStart = mStartDate.format("jD jMMMM");
  return formattedStart; // Outputs: 5 تیر
};

export const ConvertToShamsi = (
  gregorianDate,
  addDay = 0,
  format = "jYYYY/jMM/jDD"
) => {
  if (!gregorianDate) {
    console.log("No date provided");
  }

  // Create moment object from input date
  let dateMoment = moment(gregorianDate);

  // Check if date is valid
  if (!dateMoment.isValid()) {
    throw new Error("Invalid date provided");
  }

  // Add days if requested
  if (addDay > 0) {
    dateMoment = dateMoment.add(addDay, "days");
  }

  // Convert to Shamsi and format
  return dateMoment.format(format);
};
