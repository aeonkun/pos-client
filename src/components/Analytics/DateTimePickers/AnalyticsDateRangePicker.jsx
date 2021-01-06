import React from "react";
import { DateRangePicker } from "@blueprintjs/datetime";
import { shortcuts } from "./DateRangeShortcuts";

const AnalyticsDateRangePicker = ({ dateRange, handleDateChange }) => {
  return (
    <DateRangePicker
      shortcuts={shortcuts}
      allowSingleDayRange
      value={[dateRange[0], dateRange[1]]}
      onChange={handleDateChange}
    />
  );
};

export default AnalyticsDateRangePicker;
