import React from "react";
import { Switch } from "react-router-dom";
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
} from "..";
import InventoryManagement from "../Inventory/InventoryManagement";

const MainDisplay = ({ user }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>
          <Switch>
            <PrivateRoute path="/" exact component={Analytics} />
            <PrivateRoute path="/orders" exact component={OrderListContainer} />
            <PrivateRoute
              path="/orders/create"
              exact
              component={OrderForm}
              user={user}
            />
            <PrivateRoute
              path="/products"
              exact
              component={ProductListContainer}
            />
            <PrivateRoute
              path="/products/create"
              exact
              component={ProductFormContainer}
            />
            <PrivateRoute path="/analytics" exact component={Analytics} />
            <PrivateRoute
              path="/inventory"
              exact
              component={InventoryManagement}
            />
            <PrivateRoute
              path="/delivery/destinations"
              exact
              component={DeliveryDestinationsAndCharges}
            />
            <PrivateRoute
              path="/delivery/destinations/create"
              exact
              component={DeliveryDestinationAndChargeForm}
            />
          </Switch>
        </Grid>
      </Container>
    </main>
  );
};

export default MainDisplay;
