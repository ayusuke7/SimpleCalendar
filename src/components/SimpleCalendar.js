import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getMonthName,
  getMonthLenght,
  getWeekNames,
  parseStringToDate,
  validateTypeDates,
  createPatternDate,
  parseDateToString,
  findDateObjOrStr,
} from "../utils/CalendarUtils";

import CalendarMonths from "../components/CalendarMonths";
import CalendarDays from "../components/CalendarDays";
import CalendarYears from "../components/CalendarYears";
import ClockDigital from "../components/ClockDigital";

import "./SimpleCalendar.css";

var now = new Date();

class SimpleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: parseStringToDate(props.initDate).getUTCFullYear(),
      month: parseStringToDate(props.initDate).getUTCMonth(),
      selects: validateTypeDates(props.dates),
      days: [],
      layout: 1,
      iniDay: null,
      maxDay: null,
    };
  }

  componentDidMount() {
    const { enableSelectDateNow } = this.props;
    const dt = enableSelectDateNow ? parseDateToString(now) : null;
    this.addOrRemoveDateInSelects(dt);
  }

  addOrRemoveDateInSelects = (date) => {
    const { selects, month, year } = this.state;
    const validates = selects;
    const index = validates.indexOf(date);

    /* add or remove in array selects */
    if (index > -1) {
      validates.splice(index, 1);
    } else if (date) {
      validates.push(date);
    }

    this.setState({ selects: validates }, () => {
      this.setDaysOfMonth(month, year);
    });
  };

  setDaysOfMonth = (month, year) => {
    const { selects } = this.state;
    const initDay = new Date(year, month, 1).getUTCDay();
    const maxDay = getMonthLenght(month, year);

    const days = Array.from(Array(42)).map((_, i) => {
      const value = i - initDay + 1;
      const itemDay = i >= initDay && value <= maxDay ? value : "";

      const pattern = createPatternDate(year, month + 1, itemDay);
      const indexOf = findDateObjOrStr(selects, pattern);

      if (itemDay && indexOf > -1) {
        const obj = { day: itemDay, select: true };
        const value = selects[indexOf];

        if (typeof value === "string") {
          return { ...obj, date: value };
        }
        return { ...obj, ...value };
      }

      return { day: itemDay };
    });

    this.setState({ month, days, year, initDay, maxDay });
  };

  onClickArrowLeft = () => {
    const { month, year, layout } = this.state;
    const { onClickPrev } = this.props;

    if (layout === 3) {
      this.setState({ year: year - 11 });
      return null;
    }

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
    const { month, year, layout } = this.state;
    const { onClickNext } = this.props;

    if (layout === 3) {
      this.setState({ year: year + 11 });
      return null;
    }

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

  onClickItemDay = (item) => {
    const { onClickDay, enableSelectDays } = this.props;
    const { month, year } = this.state;

    if (item.day && enableSelectDays) {
      const obj = this.createObjRetorno(year, month, item.day);
      this.addOrRemoveDateInSelects(obj.date);
      return onClickDay(obj);
    }

    return null;
  };

  onChangeLayout = (layout) => {
    this.setState({ layout });
  };

  createObjRetorno = (year, month, day) => {
    const { selects } = this.state;
    const { locale } = this.props;
    const days = getMonthLenght(month, year);
    const wkname = getMonthName(month, locale);
    const date = createPatternDate(year, month + 1, day);

    return {
      date: date || "",
      day: day || "",
      month: wkname,
      year: year,
      cntDays: days,
      selects,
    };
  };

  getWeekNamesOrCustom = () => {
    const { locale, weekNamesAbrv, customWeekNames } = this.props;

    if (customWeekNames.length === 7) {
      return customWeekNames;
    } else if (customWeekNames.length > 0 && customWeekNames.length !== 7) {
      console.warn(`failed customWeekNames: lenght is diference of (7) `);
    }

    return getWeekNames(locale, weekNamesAbrv);
  };

  render() {
    const { locale, isClockTime } = this.props;
    const { days, layout, month, year, initDay, maxDay } = this.state;

    return (
      <div className="calendar-container">
        <div className="header">
          <div className="btn-arrow" onClick={this.onClickArrowLeft}>
            &#10094;
          </div>
          <div className="title">
            <div onClick={() => this.onChangeLayout(2)}>
              {getMonthName(month, locale)}
            </div>
            <div className="separate" />
            <div onClick={() => this.onChangeLayout(3)}>{year}</div>
          </div>
          <div className="btn-arrow" onClick={this.onClickArrowRight}>
            &#10095;
          </div>
        </div>
        {layout === 1 ? (
          <CalendarDays
            days={days}
            initDay={initDay}
            maxDay={maxDay}
            weekNames={this.getWeekNamesOrCustom()}
            onClickItemDay={this.onClickItemDay}
          />
        ) : layout === 2 ? (
          <CalendarMonths
            locale={locale}
            month={month}
            onChangeMonth={(index) => {
              this.setDaysOfMonth(index, year);
              this.setState({ layout: 1 });
            }}
          />
        ) : (
          <CalendarYears
            year={year}
            onChangeYear={(index) => {
              this.setDaysOfMonth(month, index);
              this.setState({ layout: 1 });
            }}
          />
        )}
        {isClockTime ? <ClockDigital date={now} locale={locale} /> : null}
      </div>
    );
  }
}

SimpleCalendar.propTypes = {
  dates: PropTypes.array,
  locale: PropTypes.string,
  initDate: PropTypes.string,
  isClockTime: PropTypes.bool,
  enableSelectDays: PropTypes.bool,
  enableSelectDateNow: PropTypes.bool,
  customWeekNames: PropTypes.array,
  weekNamesAbrv: PropTypes.bool,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickDay: PropTypes.func,
};

SimpleCalendar.defaultProps = {
  dates: [],
  locale: "pt",
  initDate: "",
  isClockTime: false,
  customWeekNames: [],
  weekNamesAbrv: true,
  enableSelectDays: false,
  enableSelectDateNow: true,
  onClickPrev: () => null,
  onClickNext: () => null,
  onClickDay: () => null,
};

export default SimpleCalendar;
