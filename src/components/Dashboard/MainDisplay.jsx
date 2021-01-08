import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "./DashboardStyle";
import PrivateRoute from "../../routes/PrivateRoute";
import {
  OrderForm,
  OrderListContainer,
  ProductFormContainer,
  ProductListContainer,
  Analytics,
  DeliveryDestinationsAndCharges,
  DeliveryDestinationAndChargeForm,
  InventoryList,
} from "..";
import InventoryManagement from "../Inventory/InventoryManagement";
import { useAuth0 } from "@auth0/auth0-react";

const MainDisplay = () => {
  const { isAuthenticated, user } = useAuth0();

  const classes = useStyles();
  if (isAuthenticated) {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            <Switch>
              <Route path="/" exact component={Analytics} />
              <Route path="/orders" exact component={OrderListContainer} />
              <Route
                path="/orders/create"
                exact
                component={OrderForm}
                user={user}
              />
              <Route path="/products" exact component={ProductListContainer} />
              <Route
                path="/products/create"
                exact
                component={ProductFormContainer}
              />
              <Route path="/analytics" exact component={Analytics} />
              <Route path="/inventory" exact component={InventoryList} />
              <Route
                path="/inventory/adjust"
                exact
                component={InventoryManagement}
              />
              <Route
                path="/delivery/destinations"
                exact
                component={DeliveryDestinationsAndCharges}
              />
              <Route
                path="/delivery/destinations/create"
                exact
                component={DeliveryDestinationAndChargeForm}
              />
            </Switch>
          </Grid>
        </Container>
      </main>
    );
  }
};

export default MainDisplay;
