import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Grid } from "@material-ui/core";
import { DashboardContainer, LoginRedirect } from "../src/components";

const App = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (isAuthenticated) {
    return <DashboardContainer path="/analytics" />;
  } else {
    return <LoginRedirect path="/authorize" />;
  }
};

export default App;
