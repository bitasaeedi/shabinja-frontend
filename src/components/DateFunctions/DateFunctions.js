import jalaali from "jalaali-js";

export const GetMiladiStdFunc = (dateMiladi) => {
  const d = new Date(dateMiladi);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Add leading zero to single-digit months
  const day = String(d.getDate()).padStart(2, "0"); // Add leading zero to single-digit days
  return `${year}/${month}/${day}`;
};

export const GetShamsiDateDetails = (miladiDate) => {
  const date = new Date(miladiDate); // Convert input to a Date object
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
