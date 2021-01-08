import React, { Fragment, useState } from "react";
import { IconButton } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { PopOverYearMonthPicker } from "../../..";

const YearMonthPickerButton = ({
  year,
  handleYearChange,
  month,
  handleMonthChange,
  enableMonth,
  toggleEnableMonth,
}) => {
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);

  return (
    <Fragment>
      <IconButton color="primary" onClick={handleClick}>
        <DateRangeIcon />
      </IconButton>
      <PopOverYearMonthPicker
        open={open}
        handleClose={handleClose}
        anchorElement={anchorElement}
        year={year}
        handleYearChange={handleYearChange}
        month={month}
        handleMonthChange={handleMonthChange}
        enableMonth={enableMonth}
        toggleEnableMonth={toggleEnableMonth}
      />
    </Fragment>
  );
};

export default YearMonthPickerButton;
