import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { PopOverDateRange } from "../../..";
import { Fragment } from "react";

const DateRangePickerButton = ({ dateRange, handleDateChange }) => {
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
      <PopOverDateRange
        open={open}
        handleClose={handleClose}
        anchorElement={anchorElement}
        dateRange={dateRange}
        handleDateChange={handleDateChange}
      />
    </Fragment>
  );
};

export default DateRangePickerButton;
