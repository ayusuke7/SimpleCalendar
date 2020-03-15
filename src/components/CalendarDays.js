import React from "react";
import "./CalendarDays.css";

const CalendarDays = ({ days, initDay, maxDay, weekNames, onClickItemDay }) => {
  return (
    <>
      <div className="week-names">
        {weekNames.map((item, i) => (
          <label key={i.toString()}>{item}</label>
        ))}
      </div>
      <div className="week-days">
        {days.map((item, i) => {
          let aux = i - initDay;
          let auxNext = aux >= maxDay ? aux - maxDay + 1 : "";

          let css = "day";
          css += item.select ? " select" : "";
          css += auxNext ? " next" : "";
          css += i < initDay ? " prev" : "";

          return (
            <div
              key={i.toString()}
              className={css}
              style={{
                "--bgColor": item.bgColor || "lightgrey",
                "--fontColor": item.fontColor || "black",
                "--iconColor": item.iconColor || "black",
                "--fontSize": item.fontSize || "18px",
                "--iconSize": item.iconSize || "18px"
              }}
              onClick={() => onClickItemDay(item)}
            >
              <div className="icon">{item.icon}</div>
              <div className="number">{item.day || auxNext}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarDays;
