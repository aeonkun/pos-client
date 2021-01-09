import { Grid, Paper, Typography } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import SalesGraph from "./SalesGraph";
import useStyles from "./AnalyticsStyles";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { getSalesActivitySummaryApi } from "../../api";
import NumberFormat from "react-number-format";
import LoadingOverlay from "react-loading-overlay";
import { getMonth, getYear } from "date-fns";
import { YearMonthPickerButton } from "..";

const SalesSummary = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [chartData, setChartData] = useState([{}]);

  const [date, setDate] = useState(new Date());

  // add 1 on the month since date-fns "january" is equal to 0
  const [enableMonth, setEnableMonth] = useState(true);

  const toggleEnableMonth = (event) => {
    setEnableMonth(event.target.checked);
  };

  let url = `/analytics/salesactivity?year=${getYear(date)}&month=${
    enableMonth ? getMonth(date) + 1 : 0
  }`;

  const getSalesActivitySummary = async () => {
    const token = await getAccessTokenSilently();
    const salesActivity = await getSalesActivitySummaryApi(
      token,
      getYear(date),
      enableMonth !== false ? getMonth(date) + 1 : 0
    );
    setChartData(salesActivity);
    return salesActivity;
  };

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
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h5">Sales Activity Summary</Typography>
                </Grid>
                <Grid item>
                  <YearMonthPickerButton
                    date={date}
                    handleDateChange={setDate}
                    enableMonth={enableMonth}
                    toggleEnableMonth={toggleEnableMonth}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {`Total Sales: `}
                    {!data && "Loading data..."}
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
