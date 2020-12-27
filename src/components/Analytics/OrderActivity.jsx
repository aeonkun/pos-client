import React, { Fragment } from "react";
import OrderStatusCard from "./OrderStatusCard";
import { Grid, Typography, Paper } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getOrderActivityApi } from "../../api";
import { CircularProgress } from "@material-ui/core";
import * as Constants from "../OrderList/constants/OrderListConstants";

const OrderActivity = ({ timeUnit }) => {
  const { getAccessTokenSilently } = useAuth0();

  const url = `/analytics/orderactivity?timeUnit=${timeUnit}`;

  const getOrderActivity = async () => {
    const token = await getAccessTokenSilently();
    const orderActivity = await getOrderActivityApi(token, timeUnit);
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
          <Grid item xs={12}>
            <Typography variant="h5">Order Activity</Typography>
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
