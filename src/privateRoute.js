import React from "react";
import { Route, Redirect } from 'react-router-dom';

const isLoggedIn = () => {
  if (localStorage.getItem('auth')) {
    return true;
  }

  return false;
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
