import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const LoginRedirect = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h2" component="h2">
          Order Management System
        </Typography>
      </Grid>
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
  );
};

export default LoginRedirect;
