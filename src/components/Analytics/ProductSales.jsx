import React, { Fragment, useState } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import ProductSalesChart from "./ProductSalesChart";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getProductSalesApi } from "../../api";
import { CircularProgress } from "@material-ui/core";
import { startOfMonth, endOfMonth } from "date-fns";
import { DateRangePickerButton } from "..";

const ProductSales = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [dateRange, setDateRange] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
  };

  const getProductSales = async () => {
    const token = await getAccessTokenSilently();
    const orderActivity = await getProductSalesApi(token, dateRange);
    return orderActivity;
  };

  let url = `/analytics/productsales?startDate=${dateRange[0]}&endDate=${dateRange[1]}`;

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
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5">Product Sales</Typography>
            </Grid>
            <Grid item>
              <DateRangePickerButton
                dateRange={dateRange}
                handleDateChange={handleDateChange}
              />
            </Grid>
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
