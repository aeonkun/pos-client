import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import {Route} from 'react-router-dom';


const PrivateRoute = ({ component, ...args }) => (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <div>loading...</div>,
      })}
      {...args}
    />
  );
  
  export default PrivateRoute;