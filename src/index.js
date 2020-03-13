import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";

const dates = [{ date: "2020-02-13" }, { date: "2020-02-03" }];

ReactDOM.render(
  <SimpleCalendar
    dates={dates}
    weekNamesAbrv={false}
    tranlate={"en"}
    onClickPrev={data => {}}
    onClickNext={data => {}}
  />,
  document.getElementById("root")
);
