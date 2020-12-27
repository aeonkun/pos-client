import React, { Fragment } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import ProductSalesChart from "./ProductSalesChart";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getProductSalesApi } from "../../api";
import { CircularProgress } from "@material-ui/core";

const ProductSales = ({ timeUnit }) => {
  const { getAccessTokenSilently } = useAuth0();

  const getProductSales = async () => {
    const token = await getAccessTokenSilently();
    const orderActivity = await getProductSalesApi(token, timeUnit);
    return orderActivity;
  };

  const url = `/analytics/productsales?timeUnit=${timeUnit}`;

  const { data, error } = useSWR(url, getProductSales);

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
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Typography variant="h5">Product Sales</Typography>
          </Grid>
          <Grid item xs={12}>
            <ProductSalesChart data={data} />
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ProductSales;
