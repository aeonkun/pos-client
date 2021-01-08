import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route } from "react-router-dom";

import useStyles from "./DashboardStyle";
import { TopBar, SideBar } from "..";
import MainDisplay from "./MainDisplay";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { isLoading, isAuthenticated, error, user, logout } = useAuth0();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Oops... {`Error occured: ${error.message}`}</div>;
  }

  if (isAuthenticated) {
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar handleDrawerOpen={handleDrawerOpen} />
          <SideBar
            user={user}
            open={open}
            handleDrawerClose={handleDrawerClose}
            logout={logout}
          />
        </div>
        <MainDisplay user={user} />
      </Router>
    );
  }
};

export default Dashboard;
