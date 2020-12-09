import React, { Fragment } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";

const OrderStatusCard = ({ number, status }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" variant="h5">
            {status}
          </Typography>
          <Typography variant="h5">{number}</Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default OrderStatusCard;
