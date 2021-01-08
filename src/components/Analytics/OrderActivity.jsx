import React, { Fragment, useState } from "react";
import OrderStatusCard from "./OrderStatusCard";
import { Grid, Typography, Paper } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getOrderActivityApi } from "../../api";
import * as Constants from "../OrderList/constants/OrderListConstants";
import { startOfMonth, endOfMonth } from "date-fns";
import { DateRangePickerButton } from "..";
import LoadingOverlay from "react-loading-overlay";
import CountUp from "react-countup";

const OrderActivity = () => {
  const { getAccessTokenSilently } = useAuth0();

  //for swr fetching
  const [url, setUrl] = useState(`/analytics/orderactivity`);
  const [statusData, setStatusData] = useState([
    { orderStatus: "NEW", number: 0 },
    { orderStatus: "CONFIRMED", number: 0 },
    { orderStatus: "COMPLETED", number: 0 },
    { orderStatus: "CANCELLED", number: 0 },
  ]);
  const [dateRange, setDateRange] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setUrl(
        `/analytics/orderactivity?startDate=${dateRange[0]}&endDate=${dateRange[1]}`
      );
    }
  };

  const getOrderActivity = async () => {
    const token = await getAccessTokenSilently();
    const orderActivity = await getOrderActivityApi(token, dateRange);
    if (orderActivity) {
      setStatusData(orderActivity);
    }
    return orderActivity;
  };

  const { data, error, isValidating } = useSWR(url, getOrderActivity);

  const classes = useStyles();

  if (error) return <p>Error occured. Please refresh page.</p>;

  return (
    <Fragment>
      <LoadingOverlay
        active={!data || isValidating}
        spinner
        text="Loading your content..."
      >
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
                {statusData.map((item) => (
                  <Grid item xs={12 / statusData.length}>
                    <OrderStatusCard
                      number={
                        <CountUp
                          start={0}
                          end={item.number}
                          duration={0.5}
                          separator=","
                        />
                      }
                      status={Constants.orderStatuses[item.orderStatus]}
                    ></OrderStatusCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </LoadingOverlay>
    </Fragment>
  );
};

export default OrderActivity;
