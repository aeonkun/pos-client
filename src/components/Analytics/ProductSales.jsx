import React, { Fragment, useState } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import useStyles from "./AnalyticsStyles";
import ProductSalesChart from "./ProductSalesChart";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getProductSalesApi } from "../../api";
import { startOfMonth, endOfMonth } from "date-fns";
import { DateRangePickerButton } from "..";
import LoadingOverlay from "react-loading-overlay";

const ProductSales = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [chartData, setChartData] = useState([{}]);
  const [url, setUrl] = useState(`/analytics/productsales`);
  const [dateRange, setDateRange] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);

  const handleDateChange = (dateRange) => {
    setDateRange(dateRange);
    if (dateRange[0] !== null && dateRange[1] !== null) {
      setUrl(
        `/analytics/productsales?startDate=${dateRange[0]}&endDate=${dateRange[1]}`
      );
    }
  };

  const getProductSales = async () => {
    const token = await getAccessTokenSilently();
    const productSales = await getProductSalesApi(token, dateRange);
    setChartData(productSales);
    return productSales;
  };

  const { data, error, isValidating } = useSWR(url, getProductSales);

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
              <ProductSalesChart data={chartData} />
            </Grid>
          </Grid>
        </Paper>
      </LoadingOverlay>
    </Fragment>
  );
};

export default ProductSales;
