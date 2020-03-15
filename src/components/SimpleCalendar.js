import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getMonthName,
  getMonthLenght,
  getWeekNames,
  validateTypeDates
} from "../utils/CalendarUtils";

import CalendarMonths from "../components/CalendarMonths";
import CalendarDays from "../components/CalendarDays";

import "./SimpleCalendar.css";

var now = new Date();
var YEAR = now.getFullYear();
var MONTH = now.getMonth();
var DAYNOW = now.toJSON().substr(0, 10);

class SimpleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      year: YEAR,
      month: MONTH,
      layout: 1,
      selects: validateTypeDates(props.dates)
    };
  }

  componentDidMount() {
    this.setDateInSelects(DAYNOW);
  }

  setDateInSelects = date => {
    const { selects, month, year } = this.state;
    const validates = selects;
    const index = validates.indexOf(date);

    if (index > -1) {
      validates.splice(index, 1);
    } else {
      validates.push(date);
    }

    this.setState({ selects: validates }, () => {
      this.setDaysOfMonth(month, year);
    });
  };

  setDaysOfMonth = (month, year) => {
    const { selects } = this.state;
    const dtDay = new Date(year, month, 1).getDay();
    const maxDay = getMonthLenght(month, year);

    const days = Array.from(Array(42)).map((_, i) => {
      const value = i - dtDay + 1;
      const item = i >= dtDay && value <= maxDay ? value : "";
      const pattern = this.createPatternDate(year, month + 1, item);
      const index = selects.indexOf(pattern);

      if (item && index > -1) {
        const obj = { day: item, select: true };
        const value = selects[index];
        if (typeof value === "string") {
          return { ...obj, date: value };
        }
        return { ...obj, ...value };
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
    const obj = this.createObjRetorno(tmpYear, tmpMonth, 1);
    return onClickPrev(obj);
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
    const obj = this.createObjRetorno(tmpYear, tmpMonth, 1);
    return onClickNext(obj);
  };

  onClickItemDay = item => {
    if (!item.day) return null;
    const { month, year } = this.state;
    const { onClickDay } = this.props;
    const obj = this.createObjRetorno(year, month, item.day);
    this.setDateInSelects(obj.date);
    return onClickDay(obj);
  };

  onChangeLayout = e => {
    const { layout } = this.state;
    this.setState({ layout: layout === 0 ? 1 : 0 });
  };

  createObjRetorno = (year, month, day) => {
    const { selects } = this.state;
    const { locale } = this.props;
    const days = getMonthLenght(month, year);
    const wkname = getMonthName(month, locale);
    const date = this.createPatternDate(year, month + 1, day);

    return {
      date: date || "",
      day: day || "",
      month: wkname,
      year: year,
      cntDays: days,
      selects
    };
  };

  /* Renders */
  renderWeekNames = () => {
    const { locale, weekNamesAbrv, customWeekNames } = this.props;
    return customWeekNames.length === 7
      ? customWeekNames
      : getWeekNames(locale, weekNamesAbrv);
  };

  render() {
    const { locale } = this.props;
    const { days, layout, month, year } = this.state;

    return (
      <div className="calendar-container">
        <div className="header">
          <div className="btn-arrow" onClick={this.onClickArrowLeft}>
            &#10094;
          </div>
          <div className="title">
            <div onClick={this.onChangeLayout}>
              {getMonthName(month, locale)}
            </div>
            <div className="separate" />
            <div>{year}</div>
          </div>
          <div className="btn-arrow" onClick={this.onClickArrowRight}>
            &#10095;
          </div>
        </div>
        {layout === 1 ? (
          <CalendarDays
            days={days}
            weekNames={this.renderWeekNames()}
            onClickItemDay={this.onClickItemDay}
          />
        ) : (
          <CalendarMonths
            locale={locale}
            month={month}
            onChangeMonth={index => {
              this.setDaysOfMonth(index, year);
              this.setState({ layout: 1 });
            }}
          />
        )}
      </div>
    );
  }
}

SimpleCalendar.propTypes = {
  dates: PropTypes.array,
  locale: PropTypes.string,
  customWeekNames: PropTypes.array,
  weekNamesAbrv: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickDay: PropTypes.func
};

SimpleCalendar.defaultProps = {
  dates: [],
  locale: "en",
  customWeekNames: [],
  weekNamesAbrv: false,
  onClickPrev: () => null,
  onClickNext: () => null,
  onClickDay: () => null
};

export default SimpleCalendar;
