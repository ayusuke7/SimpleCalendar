import React from "react";
import ReactDOM from "react-dom";
import SimpleCalendar from "./components/BbCalendar";

const dates = [{ date: "2020-01-03" }, { date: "2020-02-03" }];

ReactDOM.render(
  <SimpleCalendar dates={dates} weekNamesType={"Pt"} />,
  document.getElementById("root")
);
