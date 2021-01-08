import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import SalesGraph from "./SalesGraph";
import useStyles from "./AnalyticsStyles";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { getSalesActivitySummaryApi } from "../../api";
import { CircularProgress } from "@material-ui/core";
import NumberFormat from "react-number-format";
import TimeUnitDropDown from "./TimeUnitDropDown";
import LoadingOverlay from "react-loading-overlay";

const SalesSummary = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [timeUnit, setTimeUnit] = useState("MONTHLY");
  const [chartData, setChartData] = useState([{}]);

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  const getSalesActivitySummary = async () => {
    const token = await getAccessTokenSilently();
    const salesActivity = await getSalesActivitySummaryApi(token, timeUnit);
    setChartData(salesActivity);
    return salesActivity;
  };
  const url = `/analytics/salesactivity?timeUnit=${timeUnit}`;
  const { data, error, isValidating } = useSWR(url, getSalesActivitySummary);

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
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography variant="h5">Sales Activity Summary</Typography>
                </Grid>
                <Grid item>
                  {/* <TimeUnitDropDown
                  timeUnit={timeUnit}
                  handleTimeUnitChange={handleTimeUnitChange}
                /> */}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {`Total Sales: `}
                    {!data && "No Data"}
                    {data && (
                      <NumberFormat
                        value={
                          data.reduce((a, b) => a + (b["value"] || 0), 0) / 100
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      ></NumberFormat>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <SalesGraph data={chartData} />
            </Grid>
          </Grid>
        </Paper>
      </LoadingOverlay>
    </Fragment>
  );
};

export default SalesSummary;
