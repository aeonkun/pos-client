import React, { Fragment, useState } from "react";
import OrderActivity from "./OrderActivity";
import Grid from "@material-ui/core/Grid";
import SalesSummary from "./SalesSummary";
import ProductSales from "./ProductSales";
import Greeting from "./Greeting";
import TimeUnitDropDown from "./TimeUnitDropDown";

const Analytics = () => {
  return (
    <Fragment>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={10}>
          <Greeting />
        </Grid>
        <Grid item xs={12}>
          <OrderActivity />
        </Grid>
        <Grid item xs={12}>
          <SalesSummary />
        </Grid>
        <Grid item xs={12}>
          <ProductSales />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Analytics;
