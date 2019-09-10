import React from "react";
import {
  Route,
  Redirect,
} from 'react-router-dom';

const isLogin = () => {
  if (localStorage.getItem('_id')) {
    return true;
  }

  return false;
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() ? (
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
