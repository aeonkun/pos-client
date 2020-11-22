import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";

import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    redirectUri={config.redirectUri}
    audience={config.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
