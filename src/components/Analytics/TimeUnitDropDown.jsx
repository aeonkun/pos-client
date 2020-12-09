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
        <MenuItem value={"WEEKLY"}>This week</MenuItem>
        <MenuItem value={"MONTHLY"}>This month</MenuItem>
        <MenuItem value={"ANNUALY"}>This year</MenuItem>
      </Select>
    </Fragment>
  );
};

export default TimeUnitDropDown;
