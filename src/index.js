import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/SimpleCalendar";

const dates = ["2020-03-01"];

ReactDOM.render(
  <SimpleCalendar
    dates={dates}
    locale="pt"
    onClickPrev={data => console.log(data)}
    onClickNext={data => console.log(data)}
    onClickDay={data => console.log(data)}
  />,
  document.getElementById("root")
);
