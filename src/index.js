import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";
import { getAll } from "./utils/Symbols";

const dates = () => {
  return getAll().map((s, i) =>
    Object({
      date: `2020-04-0${i + 1}`,
      icon: s,
      //iconSize: "28px",
      //subtitle: "dia de são paulo",
    })
  );
};

ReactDOM.render(
  <SimpleCalendar
    //locale="en"
    //dates={dates()}
    //initDate={"2020-12-31"}
    mode="digital"
    enableSelectDays
    enableSelectDateNow
    //weekNamesAbrv={false}
    //customWeekNames={["A", "B", "C", "D", "E", "F", "G"]}
    onClickPrev={(data) => console.log(data)}
    onClickNext={(data) => console.log(data)}
    onClickDay={(data) => console.log(data)}
  />,
  document.getElementById("root")
);
