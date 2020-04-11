import React from "react";
import "./CalendarDays.css";

export default function CalendarDays({
  days,
  initDay,
  maxDay,
  weekNames,
  onClickItemDay,
}) {
  let subtitles = [];

  return (
    <>
      <div className="week-names">
        {weekNames.map((item, i) => (
          <label key={i.toString()}>{item}</label>
        ))}
      </div>
      <div className="week-days">
        {days.map((item, i) => {
          if (item.subtitle) {
            subtitles.push(item);
          }

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
                "--fontSize": item.fontSize || "3.7vmin",
                "--iconSize": item.iconSize || "18px",
              }}
              onClick={() => onClickItemDay(item)}
            >
              <div className="icon">{item.icon}</div>
              <div className="number">{item.day || auxNext}</div>
            </div>
          );
        })}
      </div>
      {subtitles.length > 0 ? (
        <div className="subtitles">
          {subtitles.map((s, i) => (
            <div key={i.toString()}>
              <div className="sub-icon">{s.icon}</div>
              <div className="sub-text">{s.subtitle}</div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
