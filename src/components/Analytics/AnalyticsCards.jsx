import React, { Fragment } from "react";
import { OrdersCard, IncomeCard } from "..";
import Grid from "@material-ui/core/Grid";

const AnalyticsCards = () => {
  return (
    <Fragment>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6}>
          <OrdersCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IncomeCard />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AnalyticsCards;
