import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { DashboardContainer } from "./components";

const App = () => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return <DashboardContainer path="/dashboard" />;
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
};

export default App;
