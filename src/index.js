import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";
import Symbols, { getAll } from "./utils/Symbols";

const dates = () => {
  return getAll().map((s, i) =>
    Object({
      date: `2020-03-0${i + 1}`,
      icon: s,
      iconSize: "20px"
    })
  );
};

ReactDOM.render(
  <SimpleCalendar
    //locale="pt"
    dates={dates()}
    //initDate={"2020-12-31"}
    //weekNamesAbrv
    enableSelectDays
    //enableSelectDateNow
    //customWeekNames={["A", "B", "C", "D", "E", "F", "G"]}
    onClickPrev={data => console.log(data)}
    onClickNext={data => console.log(data)}
    onClickDay={data => console.log(data)}
  />,
  document.getElementById("root")
);
