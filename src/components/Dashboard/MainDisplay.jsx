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
  AnalyticsCards,
  InvoiceDisplay,
} from "..";
import InventoryManagement from "../Inventory/InventoryManagement";

const MainDisplay = ({ user }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Switch>
            <PrivateRoute path="/" exact component={OrderListContainer} />
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
            <PrivateRoute path="/analytics" exact component={AnalyticsCards} />
            <PrivateRoute
              path="/inventory"
              exact
              component={InventoryManagement}
            />
            <PrivateRoute path="/invoice" exact component={InvoiceDisplay} />
          </Switch>
        </Grid>
      </Container>
    </main>
  );
};

export default MainDisplay;
