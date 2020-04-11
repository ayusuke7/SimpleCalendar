import React, { useState, useEffect } from "react";
import { parseHourMinSec, parseDateToExtense } from "../utils/CalendarUtils";

import "./ClockDigital.css";

export default function ClockDigital({ date, locale }) {
  const [time, setTime] = useState({ hor: "0", min: "0", sec: "0" });

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      setTime({
        hor: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds(),
      });
    }, 1000);
  }, []);

  return (
    <div className="clock">
      <div className="container">
        <div className="arrow">
          <span>&#10148;</span>
        </div>
        <div className="extense">
          <span>{parseDateToExtense(date, locale)}</span>
        </div>
        <div className="digital">
          <span>{parseHourMinSec(time.hor)}:</span>
          <span>{parseHourMinSec(time.min)}:</span>
          <span>{parseHourMinSec(time.sec)}</span>
        </div>
      </div>
    </div>
  );
}
