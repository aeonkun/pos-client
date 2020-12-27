import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./LoginRedirectStyles";
import { CssBaseline } from "@material-ui/core";

const LoginRedirect = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <Fragment>
      {/* <CssBaseline /> */}
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        className={classes.grid}
        spacing={2}
      >
        <Grid itemType>
          <Typography variant="h2" component="h2" className={classes.mainText}>
            Order Management System
          </Typography>
        </Grid>
        {/* <Grid item xs={12} /> */}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LoginRedirect;
