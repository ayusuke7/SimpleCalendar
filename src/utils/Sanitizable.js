export const weekNames = (type = "En", abrv = false) => {
  const weeks = {
    En: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  };

  if (Boolean(abrv)) {
    return weeks[type].map(i => i.charAt(0));
  }

  return weeks[type];
};

export const monthNames = (month = 0) => {
  const months = [
    { name: "Janeiro", days: 31 },
    { name: "Fevereiro", days: 28 },
    { name: "Março", days: 31 },
    { name: "Abril", days: 30 },
    { name: "Maio", days: 31 },
    { name: "Junho", days: 30 },
    { name: "Julho", days: 31 },
    { name: "Agosto", days: 31 },
    { name: "Setembro", days: 30 },
    { name: "Outubro", days: 31 },
    { name: "Novembro", days: 30 },
    { name: "Dezembro", days: 31 }
  ];

  return months[month];
};

export const isYearBissexto = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
