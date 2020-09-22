import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import App from './App';

ReactDOM.render(
    <Auth0Provider
    domain="dev-s08icyce.us.auth0.com"
    clientId="GSvx7sY7H22BrJ0ilrGh3SQAI0OtYf9E"
    redirectUri="https://localhost:3000/dashboard"
    audience="http://localhost:5000/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
  );