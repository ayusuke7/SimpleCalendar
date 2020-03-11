export const weekNames = type => {
  const obj = {
    En: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Pt: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  };

  return obj[type] || obj["En"];
};

export const monthNames = [
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
