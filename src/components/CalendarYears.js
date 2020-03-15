import React from "react";
import "./CalendarYears.css";

const CalendarYears = ({ year, onChangeYear }) => {
  return (
    <div className="calendar-years">
      {Array.from(Array(12)).map((item, index) => (
        <div
          key={index.toString()}
          className={`year ${index === year ? "active" : ""}`}
          onClick={() => onChangeYear(year + index)}
        >
          <div className="name">{year + index}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarYears;
