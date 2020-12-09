import React, { Fragment, useState } from "react";
import OrderActivity from "./OrderActivity";
import Grid from "@material-ui/core/Grid";
import SalesSummary from "./SalesSummary";
import ProductSales from "./ProductSales";
import Greeting from "./Greeting";
import TimeUnitDropDown from "./TimeUnitDropDown";

const Analytics = () => {
  const [timeUnit, setTimeUnit] = useState("MONTHLY");

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  return (
    <Fragment>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={10}>
          <Greeting />
        </Grid>
        <Grid item xs={2}>
          <TimeUnitDropDown
            timeUnit={timeUnit}
            handleTimeUnitChange={handleTimeUnitChange}
          />
        </Grid>
        <Grid item xs={12}>
          <OrderActivity timeUnit={timeUnit} />
        </Grid>
        <Grid item xs={12}>
          <SalesSummary timeUnit={timeUnit} />
        </Grid>
        <Grid item xs={12}>
          <ProductSales timeUnit={timeUnit} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Analytics;
