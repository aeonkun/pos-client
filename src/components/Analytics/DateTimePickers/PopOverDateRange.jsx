import React from "react";
import { Popover, Button, Grid } from "@material-ui/core";
import { AnalyticsDateRangePicker } from "../..";

const PopOverDateRange = ({
  open,
  handleClose,
  anchorElement,
  dateRange,
  handleDateChange,
}) => {
  return (
    <Popover
      id="popOverDateRange"
      open={open}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <AnalyticsDateRangePicker
        dateRange={dateRange}
        handleDateChange={handleDateChange}
      />
    </Popover>
  );
};

export default PopOverDateRange;
