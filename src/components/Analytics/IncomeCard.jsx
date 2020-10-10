import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getIncomeApi } from "../../api";

const IncomeCard = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getIncome = async () => {
    const token = await getAccessTokenSilently();
    const income = await getIncomeApi(token);

    return income;
  };

  const { data, error } = useSWR("/analytics/orders/income", getIncome);

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <Fragment>
      {/* <Grid item xs={12} sm={6}> */}
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {`Total estimated income: ${data.total}`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
      {/* </Grid> */}
    </Fragment>
  );
};

export default IncomeCard;
