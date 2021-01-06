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
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item>
          <AnalyticsDateRangePicker
            dateRange={dateRange}
            handleDateChange={handleDateChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default PopOverDateRange;
