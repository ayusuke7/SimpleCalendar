import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";
import Symbols from "./utils/Symbols";

const dates = [{ date: "2020-03-13" }, { date: "2020-03-03" }];

ReactDOM.render(
  <SimpleCalendar
    dates={dates}
    tranlate={"pt"}
    weekNamesAbrv={false}
    onClickPrev={data => {}}
    onClickNext={data => {}}
  />,
  document.getElementById("root")
);
