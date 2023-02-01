import { useRef } from "react";
import TimeRangeSelector from "../timeRangeSelector/timeRangeSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./scheduler.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";

const Scheduler = ({ data, onSave, onDateSelect }) => {
  const [text, setText] = useState("");
  const [selectedHours, setSelectedHours] = useState(true);

  const schedulerData = useRef({
    timeRange: "",
    selectedDate: "",
    comment: "",
    employId: data.selectedEmployId,
  });

  useEffect(() => {
    schedulerData.current.employId = data.selectedEmployId;
  }, [data.selectedEmployId]);

  const handleTimeRange = (timeRange) => {
    setSelectedHours(true);
    schedulerData.current.timeRange = timeRange;
  };

  const handleDateSelect = (selectedDate) => {
    schedulerData.current.comment = null;
    schedulerData.current.selectedDate = selectedDate.toString();
    onDateSelect(selectedDate);
  };

  const handleComment = (e) => {
    schedulerData.current.comment = e.target.value;
    setText(e.target.value);
  };

  const handleSave = (e) => {
    onSave(schedulerData.current);
    setText("");
    setSelectedHours(false);
  };

  return (
    <div className="scheduler-container">
      <p>{data.selectedEmployName}</p>
      <div className="d-flex justify-content-center">
        <DatePicker inline onChange={handleDateSelect} />
        <TimeRangeSelector
          onRangeSelect={handleTimeRange}
          timeIntervalMinutes={5}
          minimumHour={8}
          maximumHour={22}
          selected={selectedHours}
        />
      </div>
      <div className="comment" style={{ width: "100%" }}>
        <p className="m-0">Adauga comentariu:</p>
        <textarea
          onChange={handleComment}
          className="w-100 resize-none"
          rows={10}
          value={text}
        />
      </div>
      <Button className="w-100 mt-2" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Scheduler;
