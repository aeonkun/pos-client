import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dashboard } from "../";

const DashboardContainer = () => {
  const { isLoading, isAuthenticated, error, user, logout } = useAuth0();

  const [open, setOpen] = useState(false);
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
    return <div>Oops... {`Error occured: ${error.message}`}</div>;
  }

  if (isAuthenticated) {
    return (
      <Dashboard
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        user={user}
        logout={logout}
      />
    );
  }
};

export default DashboardContainer;
