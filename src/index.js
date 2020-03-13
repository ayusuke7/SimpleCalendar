import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";

const dates = [
  { date: "2020-01-13", color: "#003863" },
  { date: "2020-03-03" }
];

ReactDOM.render(
  <SimpleCalendar
    //dates={dates}
    weekNamesAbrv={false}
    weekNamesType={"En"}
    onClickPrev={data => {
      console.log(data);
    }}
    onClickNext={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
