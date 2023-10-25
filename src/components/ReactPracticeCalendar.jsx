import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactPracticeCalendar = () => {
  const [myDate, setMyDate] = useState(new Date());
  return (
    <div>
      <ReactDatePicker
        className="border border-red-500 outline-none"
        selected={myDate}
        onChange={(date) => setMyDate(date)}
      />
    </div>
  );
};

export default ReactPracticeCalendar;
