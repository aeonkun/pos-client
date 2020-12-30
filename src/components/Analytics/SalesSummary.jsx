import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import SalesGraph from "./SalesGraph";
import useStyles from "./AnalyticsStyles";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { getSalesActivitySummaryApi } from "../../api";
import { CircularProgress } from "@material-ui/core";
import NumberFormat from "react-number-format";

const SalesSummary = ({ timeUnit }) => {
  const { getAccessTokenSilently } = useAuth0();

  const getSalesActivitySummary = async () => {
    const token = await getAccessTokenSilently();
    const salesActivity = await getSalesActivitySummaryApi(token, timeUnit);
    return salesActivity;
  };
  const url = `/analytics/salesactivity?timeUnit=${timeUnit}`;
  const { data, error } = useSWR(url, getSalesActivitySummary);

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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Sales Activity Summary</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {`Total Sales: `}
                  <NumberFormat
                    value={data.totalSales}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₱"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  ></NumberFormat>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SalesGraph data={data} />
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default SalesSummary;
