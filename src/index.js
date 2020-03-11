import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";

const dates = [{ date: "2020-01-03" }, { date: "2020-02-03" }];

ReactDOM.render(
  <SimpleCalendar
    dates={dates}
    weekNamesAbrv
    weekNamesType={"Pt"}
    onClickPrev={data => {
      console.log(data);
    }}
    onClickNext={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
