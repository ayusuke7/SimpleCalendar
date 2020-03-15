import React from "react";
import "./CalendarDays.css";

const CalendarDays = ({ days, weekNames, onClickItemDay }) => {
  return (
    <>
      <div className="week-names">
        {weekNames.map((item, i) => (
          <label key={i.toString()}>{item}</label>
        ))}
      </div>
      <div className="week-days">
        {days.map((item, i) => {
          return (
            <div
              key={i.toString()}
              className={`day ${item.select ? "select" : ""}`}
              style={{
                "--bgColor": item.bgColor || "lightgrey",
                "--fontColor": item.fontColor || "black"
              }}
              onClick={() => onClickItemDay(item)}
            >
              {item.icon}
              {item.day}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarDays;
