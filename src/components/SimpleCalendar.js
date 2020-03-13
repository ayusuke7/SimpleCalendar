/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment, { months, locale } from "moment";
import {
  monthNames,
  weekNames,
  monthLenght,
  isYearBissexto
} from "../utils/CalendarUtils";
import { chevronLeft, chevronRight } from "../assets";

import "./SimpleCalendar.css";

const now = moment();

const SimpleCalendar = ({
  dates,
  tranlate,
  weekNamesAbrv,
  onClickNext,
  onClickPrev
}) => {
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState(now.month());
  const [year, setYear] = useState(now.year());

  /* Select days in Month Object */
  function getDaysSelectOfMonth() {
    const daysIcon = dates.reduce((total, item) => {
      const key = parseInt(item.date.split("-")[2], 10);
      total[key] = { ...item, select: true };
      return total;
    }, {});

    return daysIcon;
  }

  /* Function generate calendar based of month/year */
  function getDaysOfMonth() {
    const dtDay = new Date(year, month - 1, 1).getDay();
    const selects = getDaysSelectOfMonth();
    const maxDay = monthLenght(month, year);

    const allDays = Array.from(Array(35)).map((_, i) => {
      const value = i - dtDay + 1;
      const item = i >= dtDay && value <= maxDay ? value : "";

      if (Object.getOwnPropertyNames(selects).includes(item.toString())) {
        return { day: item, ...selects[item] };
      }
      return { day: item };
    });
    setDays(allDays);
  }

  function getDaysInEvidence() {
    return days.filter(item => item.date);
  }

  function setTitleHeader() {
    return `${monthNames(month, tranlate)} ${year}`;
  }

  useEffect(() => {
    getDaysOfMonth();
  }, []);

  return (
    <div className="calendar-container">
      <div className="header">
        <img
          alt="arrow left"
          src={chevronLeft}
          //className={"disabled"}
          onClick={() => {
            if (month > 0) {
              const indx = month - 1;
              const days = getDaysInEvidence();
              setMonth(indx);
              getDaysOfMonth();
              return onClickPrev({ days, index: indx });
            }
            return null;
          }}
        />
        <div className="title">{setTitleHeader()}</div>
        <img
          alt="arrow right"
          src={chevronRight}
          //className={"disabled"}
          onClick={() => {
            if (month < 11) {
              const indx = month + 1;
              const days = getDaysInEvidence();
              setMonth(indx);
              getDaysOfMonth();
              return onClickNext({ days, index: indx });
            }
            return null;
          }}
        />
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
              style={{ "--color": item.color || "#c8e6ff" }}
              className={`day ${item.select ? "select" : ""}`}
            >
              {!item.icon || <img src={item.icon} alt="icon" />}
              <label>{item.day}</label>
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
