import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import './datepicker.css';

function YearMonthPicker(props) {
  const {name, label} = props;
  const [selectedDate, handleDateChange] = useState(null);

  return (
      <DatePicker
        className="picker-box"
        name={name}
        variant="inline"
        openTo="year"
        views={["year", "month"]}
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
      />
  );
}

export default YearMonthPicker;
