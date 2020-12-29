import React, { Fragment } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import { DestinationList } from "..";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { getDeliveryDestinationsAndChargesApi } from "../../api";

const DeliveryDestinationList = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getDeliveryDestinationsAndCharges = async () => {
    const token = await getAccessTokenSilently();
    const destinationsAndCharges = await getDeliveryDestinationsAndChargesApi(
      token
    );
    return destinationsAndCharges;
  };

  const url = "/delivery/destinations";

  const { data, error } = useSWR(url, getDeliveryDestinationsAndCharges);

  if (error) return <p>Error occured. Please refresh page.</p>;
  if (!data)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Delivery Destinations</Typography>
        </Grid>
        <Grid item xs={12}>
          {data.length === 0 ? (
            <p>No destinations to show</p>
          ) : (
            <DestinationList data={data} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DeliveryDestinationList;
