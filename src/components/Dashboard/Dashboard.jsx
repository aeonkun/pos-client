import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";

import useStyles from "./DashboardStyle";
import { TopBar, SideBar } from "..";
import MainDisplay from "./MainDisplay";

const Dashboard = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
  user,
  logout,
}) => {
  const classes = useStyles();

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
};

export default Dashboard;
