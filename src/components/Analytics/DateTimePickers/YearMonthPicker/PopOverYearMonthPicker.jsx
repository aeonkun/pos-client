import React from "react";
import { Popover } from "@material-ui/core";
import { YearMonthPicker } from "../../../";

const PopOverYearMonthPicker = ({
  open,
  handleClose,
  anchorElement,
  year,
  handleYearChange,
  month,
  handleMonthChange,
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
        year={year}
        handleYearChange={handleYearChange}
        month={month}
        handleMonthChange={handleMonthChange}
        enableMonth={enableMonth}
        toggleEnableMonth={toggleEnableMonth}
      />
    </Popover>
  );
};

export default PopOverYearMonthPicker;
