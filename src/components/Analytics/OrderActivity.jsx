import React, { Fragment, useState } from "react";
import OrderStatusCard from "./OrderStatusCard";
import { Grid, Typography, Paper } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR, { mutate } from "swr";
import { getOrderActivityApi } from "../../api";
import { CircularProgress } from "@material-ui/core";
import * as Constants from "../OrderList/constants/OrderListConstants";
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns";
import { DateRangePickerButton } from "..";

const OrderActivity = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [dateRange, setDateRange] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);

  let url = `/analytics/orderactivity?startDate=${dateRange[0]}&endDate=${dateRange[1]}`;

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  const getOrderActivity = async () => {
    const token = await getAccessTokenSilently();
    const orderActivity = await getOrderActivityApi(token, dateRange);
    return orderActivity;
  };

  const { data, error } = useSWR(url, getOrderActivity);

  const classes = useStyles();

  if (error) return <p>Error occured. Please refresh page.</p>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12} justify="space-between" alignItems="center">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5">Order Activity</Typography>
              </Grid>
              <Grid item>
                <DateRangePickerButton
                  dateRange={dateRange}
                  handleDateChange={handleDateChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              justify="space-evenly"
              alignItems="center"
            >
              {data.map((item) => (
                <Grid item xs={12 / data.length}>
                  <OrderStatusCard
                    number={item.number}
                    status={Constants.orderStatuses[item.orderStatus]}
                  ></OrderStatusCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default OrderActivity;
