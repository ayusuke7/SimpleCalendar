/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { monthNames, weekNames, monthLenght } from "../utils/CalendarUtils";
import "./SimpleCalendar.css";

const now = new Date();

class SimpleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      days: []
    };
  }

  componentDidMount() {
    this.setDaysOfMonth(now.getMonth(), now.getFullYear());
  }

  setDaysOfMonth = (month, year) => {
    const { dates } = this.props;

    const dtDay = new Date(year, month, 1).getDay();
    const maxDay = monthLenght(month, year);
    const selects = dates.map(dt => dt.date);

    const days = Array.from(Array(42)).map((_, i) => {
      const value = i - dtDay + 1;
      const item = i >= dtDay && value <= maxDay ? value : "";
      const pattern = this.createPatternDate(year, month + 1, item);
      const index = selects.indexOf(pattern);

      if (item && index > -1) {
        return { day: item, ...dates[index], select: true };
      }
      return { day: item };
    });

    this.setState({ month, days, year });
  };

  createPatternDate = (y, m, d) => {
    let pattern = `${y}`;
    pattern += m < 10 ? `-0${m}` : `-${m}`;
    pattern += d < 10 ? `-0${d}` : `-${d}`;
    return pattern;
  };

  setTitleHeader = () => {
    const { month, year } = this.state;
    const { tranlate } = this.props;
    const monthName = monthNames(month, tranlate);
    return `${monthName} ${year}`;
  };

  onClickArrowLeft = () => {
    const { month, year } = this.state;
    const { onClickPrev } = this.props;

    let tmpMonth = month;
    let tmpYear = year;

    if (month > 0) {
      tmpMonth -= 1;
    } else {
      tmpMonth = 11;
      tmpYear -= 1;
    }

    this.setDaysOfMonth(tmpMonth, tmpYear);
    const days = monthLenght(tmpMonth, tmpYear);
    return onClickPrev({ tmpMonth, tmpYear, days });
  };

  onClickArrowRight = () => {
    const { month, year } = this.state;
    const { onClickNext } = this.props;

    let tmpMonth = month;
    let tmpYear = year;

    if (month < 11) {
      tmpMonth += 1;
    } else {
      tmpMonth = 0;
      tmpYear += 1;
    }

    this.setDaysOfMonth(tmpMonth, tmpYear);
    const days = monthLenght(tmpMonth, tmpYear);
    return onClickNext({ tmpMonth, tmpYear, days });
  };

  render() {
    const { tranlate, weekNamesAbrv } = this.props;
    const { days } = this.state;

    return (
      <div className="calendar-container">
        <div className="header">
          <div className="btn-arrow" onClick={this.onClickArrowLeft}>
            &#10094;
          </div>
          <div className="title">{this.setTitleHeader()}</div>
          <div className="btn-arrow" onClick={this.onClickArrowRight}>
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
  }
}

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
