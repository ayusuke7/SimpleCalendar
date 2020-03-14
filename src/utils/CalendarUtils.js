var WEEK_NAMES = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
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
  { pt: "Dezembro", en: "December" }
];

var MONTH_LENGHT = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const weekNames = (locale = "en", abrv = false) => {
  if (Boolean(abrv)) {
    return WEEK_NAMES[locale].map(i => i.charAt(0));
  }

  return WEEK_NAMES[locale];
};

export const monthNames = (month = 0, locale = "en") => {
  const obj = MONTH_NAMES[month];
  return obj[locale];
};

export const monthLenght = (month, year) => {
  const isBix = year && month === 1 && isYearBissexto(year) ? 1 : 0;
  return MONTH_LENGHT[month] + isBix;
};

export const isYearBissexto = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
