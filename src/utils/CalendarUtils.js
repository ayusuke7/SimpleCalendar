var WEEK_NAMES = {
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  pt: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
};

var MONTH_NAMES = [
  { pt: "Janeiro", en: "January" },
  { pt: "Fevereiro", en: "February" },
  { pt: "Março", en: "March" },
  { pt: "Abril", en: "April" },
  { pt: "Maio", en: "May" },
  { pt: "Junho", en: "June" },
  { pt: "Julho", en: "July" },
  { pt: "Agosto", en: "August" },
  { pt: "Setembro", en: "September" },
  { pt: "Outubro", en: "October" },
  { pt: "Novembro", en: "November" },
  { pt: "Dezembro", en: "December" },
];

var MONTH_LENGHT = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getWeekNames = (locale = "en", abrv = true) => {
  if (Boolean(abrv)) {
    return WEEK_NAMES[locale].map((i) => i.substring(0, 3));
  }

  return WEEK_NAMES[locale];
};

export const getMonthName = (month = 0, locale = "en") => {
  const obj = MONTH_NAMES[month];
  return obj[locale];
};

export const getMonthsNames = (locale = "en") => {
  return MONTH_NAMES.map((m) => m[locale]);
};

export const getMonthLenght = (month, year) => {
  const isBix = year && month === 1 && isYearBissexto(year) ? 1 : 0;
  return MONTH_LENGHT[month] + isBix;
};

export const isYearBissexto = (year) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

export const validateTypeDate = (date) => {
  const value = typeof date === "object" ? date.date : date;
  if (!Date.parse(value)) {
    console.error(`failed validateTypeDates: (${value}) inválid Date`);
    return null;
  }
  return date;
};

export const validateTypeDates = (dates) => {
  const validates = [];
  dates.forEach((dt) => {
    const isDate = validateTypeDate(dt);
    if (isDate) {
      validates.push(isDate);
    }
  });
  return validates;
};

export const createPatternDate = (y, m, d) => {
  let pattern = `${y}`;
  pattern += m < 10 ? `-0${m}` : `-${m}`;
  pattern += d < 10 ? `-0${d}` : `-${d}`;
  return pattern;
};

export const parseDateToString = (date) => {
  return date
    ? createPatternDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    : "";
};

export const parseStringToDate = (date) => {
  return Date.parse(date) ? new Date(date) : new Date();
};

export const findDateObjOrStr = (arr, target) => {
  return arr.findIndex((i) => {
    if (typeof i === "object") {
      return target === i.date;
    } else {
      return target === i;
    }
  });
};

export const parseHourMinSec = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const parseDateToExtense = (date, locale) => {
  const weekName = WEEK_NAMES[locale][date.getUTCDay()];
  const monthName = MONTH_NAMES[date.getUTCMonth()][locale];
  return `${weekName},${date.getUTCDate()} de ${monthName}`;
};
