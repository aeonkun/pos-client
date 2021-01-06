import React, { Fragment } from "react";
import { Select, MenuItem } from "@material-ui/core";

const TimeUnitDropDown = ({ timeUnit, handleTimeUnitChange }) => {
  return (
    <Fragment>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={timeUnit}
        onChange={handleTimeUnitChange}
      >
        <MenuItem value={"DAILY"}>Today</MenuItem>
        <MenuItem value={"PREVIOUS_DAILY"}>Yesterday</MenuItem>
        <MenuItem value={"WEEKLY"}>This week</MenuItem>
        <MenuItem value={"MONTHLY"}>This month</MenuItem>
        <MenuItem value={"ANNUALLY"}>This year</MenuItem>
        <MenuItem value={"PREVIOUS_WEEKLY"}>Previous week</MenuItem>
        <MenuItem value={"PREVIOUS_MONTHLY"}>Previous Month</MenuItem>
        <MenuItem value={"PREVIOUS_YEARLY"}>Previous Year</MenuItem>
        <MenuItem value={"CUSTOM"}>Custom</MenuItem>
      </Select>
    </Fragment>
  );
};

export default TimeUnitDropDown;
