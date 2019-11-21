import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimeSelector = ({ setDate, date }) => {
  const hour = date.getHours();
  return (
    <div className="date-time-select">
      <h3>Select a delivery date:</h3>
      <DatePicker
        selected={date}
        onChange={newDate => setDate(newDate)}
        minDate={new Date().setHours(hour + 24)}
        // minTime={new Date().setHours(hour)}
        // maxTime={new Date().setHours(22)}
        showTimeSelect
        dateFormat="Pp"
      />
    </div>
  );
};

export default DateTimeSelector;
