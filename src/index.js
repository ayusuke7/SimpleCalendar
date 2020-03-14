import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";

const dates = [];

ReactDOM.render(
  <SimpleCalendar
    dates={dates}
    tranlate={"en"}
    weekNamesAbrv={false}
    onClickPrev={data => {
      console.log(data);
    }}
    onClickNext={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
