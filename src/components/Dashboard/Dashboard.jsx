import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { OrderForm, OrderList, ProductForm, ProductList } from "../";
import PrivateRoute from "../../routers/PrivateRoute";
import { mainListItems } from "./listItems";
import useStyles from "./DashboardStyle";

const Dashboard = () => {
  const { isLoading, isAuthenticated, error, user, logout } = useAuth0();

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            // className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                // className={clsx(
                //   classes.menuButton,
                //   open && classes.menuButtonHidden
                // )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <Typography
                component="h2"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {user.name}
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>
              <div>
                <ListItem button onClick={logout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
              </div>
            </List>
          </Drawer> */}

          <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
            <div className={classes.toolbarIcon}>
              <Typography
                component="h2"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {user.name}
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>
              <div>
                <ListItem button onClick={logout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
              </div>
            </List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Switch>
                  <PrivateRoute path="/orders" exact component={OrderList} />
                  <PrivateRoute
                    path="/orders/create"
                    exact
                    component={OrderForm}
                    user={user}
                  />
                  <PrivateRoute
                    path="/products"
                    exact
                    component={ProductList}
                  />
                  <PrivateRoute
                    path="/products/create"
                    exact
                    component={ProductForm}
                  />
                </Switch>
              </Grid>
            </Container>
          </main>
        </div>
      </Router>
    );
  }
};

export default Dashboard;
