import React from "react";
import { getMonthsNames, getMonthLenght } from "../utils/CalendarUtils";
import "./CalendarMonths.css";

const CalendarMonths = ({ locale, month, onChangeMonth }) => {
  return (
    <div className="calendar-months">
      {getMonthsNames(locale).map((item, index) => (
        <div
          key={index.toString()}
          className={`month ${index === month ? "active" : ""}`}
          onClick={() => onChangeMonth(index)}
        >
          <div className="number">
            <span>{getMonthLenght(index)}</span>
          </div>
          <div className="name">{item}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarMonths;
