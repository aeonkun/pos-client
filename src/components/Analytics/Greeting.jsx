import React, { Fragment } from "react";
import { Typography, Grid } from "@material-ui/core";

const Greeting = () => {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Here's what's happening</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Greeting;
