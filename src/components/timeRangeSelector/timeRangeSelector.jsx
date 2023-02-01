import { useState, useRef } from "react";
import "./timeRangeSelector.css";

const TimeRangeSelector = ({
  onRangeSelect,
  timeIntervalMinutes,
  minimumHour,
  maximumHour,
  selected,
}) => {
  const [timeRange, setTimeRange] = useState([]);
  const startSelectRange = useRef();

  const generateTimeSteps = (step, minHour, maxHour) => {
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
      if (dt.getHours() >= minHour && dt.getHours() < maxHour) {
        const hh =
          dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const mm =
          dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
        rc.push(hh + ":" + mm);
      }
      dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
  };

  const timeStepsArray = useRef(
    generateTimeSteps(timeIntervalMinutes, minimumHour, maximumHour)
  );

  const handleSelectRange = (rangeIndex) => {
    const arr = [...timeRange];
    if (startSelectRange.current) {
      arr[1] = rangeIndex;
      startSelectRange.current = false;
      onRangeSelect([
        timeStepsArray.current[arr[0]],
        timeStepsArray.current[arr[1]],
      ]);
    } else {
      startSelectRange.current = true;
      arr[0] = rangeIndex;
    }
    setTimeRange(arr);
  };

  const getSelectClass = (rangeIndex) => {
    if (rangeIndex >= timeRange[0] && rangeIndex <= timeRange[1]) {
      return "selected";
    }
    return "";
  };

  return (
    <div className="time-range-container">
      {timeStepsArray.current.map((time, index) => (
        <div
          key={time}
          className={`time-cell ${selected ? getSelectClass(index) : ""} `}
          onClick={() => handleSelectRange(index)}
        >
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
