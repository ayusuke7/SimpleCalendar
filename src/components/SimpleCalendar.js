/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { monthNames, weekNames, isYearBissexto } from "../utils/Sanitizable";
import { chevronLeft, chevronRight } from "../assets";

import "./SimpleCalendar.css";

const now = moment().format("YYYY-MM-DD");

const SimpleCalendar = ({
  dates,
  weekNamesType,
  weekNamesAbrv,
  onClickNext,
  onClickPrev
}) => {
  const [months, setMonths] = useState([]);
  const [index, setIndex] = useState(0);

  /* Function groupBy date of month/year */
  function getMonthsOfArray() {
    const data = dates.length > 0 ? dates : [{ date: now }];

    const group = data.reduce((total, item) => {
      const value = item.date.substring(0, 8).concat("01");
      total[value] = (total[value] || []).concat(item);
      return total;
    }, {});

    const objects = Object.keys(group).map(item => {
      return { first: item, dates: group[item] };
    });

    setMonths(objects);
    // setIndex(objects.length - 1);
  }

  /* Select days in Month Object */
  function getDaysOfMonthSelect() {
    const daysIcon = months[index]
      ? months[index].dates.reduce((total, item) => {
          const key = parseInt(item.date.split("-")[2], 10);
          total[key] = { ...item, select: true };
          return total;
        }, {})
      : {};
    return daysIcon;
  }

  /* Function generate calendar based of month/year */
  function getDaysOfMonth() {
    const date = months.length > 0 ? moment(months[index].first) : moment();

    const year = date.year();
    const month = date.month();
    const day = date.day();

    const selects = getDaysOfMonthSelect();
    const auxBix = month === 1 && isYearBissexto(year) ? 1 : 0;
    const maxDay = monthNames(month).days + auxBix;

    const allDays = Array.from(Array(35)).map((_, i) => {
      const value = i - day + 1;
      const item = i >= day && value <= maxDay ? value : "";
      if (Object.getOwnPropertyNames(selects).includes(item.toString())) {
        return { day: item, ...selects[item] };
      }
      return { day: item };
    });

    return allDays;
  }

  function getDaysInEvidence() {
    return getDaysOfMonth().filter(item => item.date);
  }

  function setTitleHeader() {
    const date = months.length > 0 ? moment(months[index].first) : moment();
    return `${monthNames(date.month()).name} ${date.year()}`;
  }

  useEffect(() => {
    getMonthsOfArray();
  }, []);

  return (
    <div className="calendar-container">
      <div className="header">
        <img
          alt="arrow left"
          src={chevronLeft}
          className={index === 0 ? "disabled" : ""}
          onClick={() => {
            if (index > 0) {
              const indx = index - 1;
              const days = getDaysInEvidence();
              setIndex(indx);
              return onClickPrev({ days, index: indx });
            }
            return null;
          }}
        />
        <div className="title">{setTitleHeader()}</div>
        <img
          alt="arrow right"
          src={chevronRight}
          className={index === months.length - 1 ? "disabled" : ""}
          onClick={() => {
            if (index < months.length - 1) {
              const indx = index + 1;
              const days = getDaysInEvidence();
              setIndex(indx);
              return onClickNext({ days, index: indx });
            }
            return null;
          }}
        />
      </div>
      <div className="week-names">
        {weekNames(weekNamesType, weekNamesAbrv).map((item, i) => (
          <label key={i.toString()}>{item}</label>
        ))}
      </div>
      <div className="week-days">
        {getDaysOfMonth().map((item, i) => {
          let css = "day ";
          css += item.select ? "select " : "";
          css += item.color ? item.color : "";
          return (
            <div key={i.toString()} className={css}>
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
  weekNamesType: PropTypes.string,
  weekNamesAbrv: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func
};

SimpleCalendar.defaultProps = {
  dates: [],
  weekNamesType: "En",
  weekNamesAbrv: false,
  onClickPrev: () => null,
  onClickNext: () => null
};

export default SimpleCalendar;
