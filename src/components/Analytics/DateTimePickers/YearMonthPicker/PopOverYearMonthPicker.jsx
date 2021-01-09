import React from "react";
import { Popover } from "@material-ui/core";
import { YearMonthPicker } from "../../../";

const PopOverYearMonthPicker = ({
  open,
  handleClose,
  anchorElement,
  date,
  handleDateChange,
  enableMonth,
  toggleEnableMonth,
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
      <YearMonthPicker
        date={date}
        handleDateChange={handleDateChange}
        enableMonth={enableMonth}
        toggleEnableMonth={toggleEnableMonth}
      />
    </Popover>
  );
};

export default PopOverYearMonthPicker;
