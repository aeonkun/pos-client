import React from "react";
import { DateRangePicker } from "@blueprintjs/datetime";

const AnalyticsDateRangePicker = ({ dateRange, handleDateChange }) => {
  return (
    <DateRangePicker
      value={[dateRange[0], dateRange[1]]}
      onChange={handleDateChange}
    />
  );
};

export default AnalyticsDateRangePicker;
