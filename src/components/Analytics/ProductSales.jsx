import React, { Fragment } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import ProductSalesChart from "./ProductSalesChart";

const ProductSales = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography variant="h5">Product Sales</Typography>
          </Grid>
          <Grid item xs={12}>
            <ProductSalesChart />
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ProductSales;
