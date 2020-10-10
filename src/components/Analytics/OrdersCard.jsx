import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const Cards = () => {
  const url = "http://localhost:5000";
  const { getAccessTokenSilently } = useAuth0();

  const fetcher = async () => {
    try {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${url}/analytics/orders/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);

  return (
    <Fragment>
      {/* <Grid item xs={12} sm={6}> */}
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {`Number of orders: ${data.total}`}
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <Typography variant="h6" gutterBottom>
                Status
              </Typography>
              {data.orderStatusAnalytics.map((element) => (
                <Typography
                  gutterBottom
                >{`${element.status}: ${element.value}`}</Typography>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* </Grid> */}

      {/* Reserved for iterating throug object properties */}
      {/* {Object.entries(data).map(([key, value], element) => (
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {`Number of orders: ${key}`}
              </Typography>
              {value.map((element) => (
                <Typography variant="h5" component="h2">
                  {`${element.status}: ${element.value}`}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))} */}
    </Fragment>
  );
};

export default Cards;
