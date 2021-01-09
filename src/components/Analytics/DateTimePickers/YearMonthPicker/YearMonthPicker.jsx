import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Fragment } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, Paper, Switch, FormControlLabel } from "@material-ui/core";
import useStyles from "../../AnalyticsStyles";

const YearMonthPicker = ({
  date,
  handleDateChange,
  enableMonth,
  toggleEnableMonth,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <DatePicker
                views={enableMonth ? ["year", "month"] : ["year"]}
                label="Date"
                value={date}
                onChange={handleDateChange}
                disableFuture
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enableMonth}
                    onChange={toggleEnableMonth}
                    name="enableMonth"
                    color="primary"
                  />
                }
                label={"Show monthly data"}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Paper>
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default YearMonthPicker;
