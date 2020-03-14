/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { monthNames, weekNames, monthLenght } from "../utils/CalendarUtils";

import "./SimpleCalendar.css";

const now = new Date();

const SimpleCalendar = ({
  dates,
  tranlate,
  weekNamesAbrv,
  onClickNext,
  onClickPrev
}) => {
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  /* Function generate calendar based of month/year */
  function setDaysOfMonth() {
    const dtDay = new Date(year, month, 1).getDay();
    const maxDay = monthLenght(month, year);
    const selects = dates.map(dt => dt.date);

    const allDays = Array.from(Array(35)).map((_, i) => {
      const value = i - dtDay + 1;
      const item = i >= dtDay && value <= maxDay ? value : "";
      const pattern = createPatternDate(year, month + 1, item);
      const index = selects.indexOf(pattern);

      if (item && index > -1) {
        return { day: item, ...dates[index], select: true };
      }
      return { day: item };
    });

    setDays(allDays);
  }

  function createPatternDate(y, m, d) {
    let pattern = `${y}`;
    pattern += m < 10 ? `-0${m}` : `-${m}`;
    pattern += d < 10 ? `-0${d}` : `-${d}`;
    return pattern;
  }

  function getDaysInEvidence() {
    return days.filter(item => item.date);
  }

  function setTitleHeader() {
    const monthName = monthNames(month, tranlate);
    return `${monthName} ${year}`;
  }

  function onClickArrowLeft() {
    if (month > 0) {
      const index = month - 1;
      setMonth(index);
      setDaysOfMonth();
      return onClickPrev({
        index: index,
        days: getDaysInEvidence()
      });
    }
    return null;
  }

  function onClickArrowRight() {
    if (month < 11) {
      const index = month + 1;
      setMonth(index);
      setDaysOfMonth();
      return onClickNext({
        index: index,
        days: getDaysInEvidence()
      });
    }
    return null;
  }

  useEffect(() => {
    setDaysOfMonth();
  }, []);

  return (
    <div className="calendar-container">
      <div className="header">
        <div className="btn-arrow" onClick={onClickArrowLeft}>
          &#10094;
        </div>
        <div className="title">{setTitleHeader()}</div>
        <div className="btn-arrow" onClick={onClickArrowRight}>
          &#10095;
        </div>
      </div>
      <div className="week-names">
        {weekNames(tranlate, weekNamesAbrv).map((item, i) => (
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
            >
              {item.icon}
              {item.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

SimpleCalendar.propTypes = {
  dates: PropTypes.array,
  tranlate: PropTypes.string,
  weekNamesAbrv: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func
};

SimpleCalendar.defaultProps = {
  dates: [],
  tranlate: "en",
  weekNamesAbrv: false,
  onClickPrev: () => null,
  onClickNext: () => null
};

export default SimpleCalendar;
