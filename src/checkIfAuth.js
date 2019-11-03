import React from 'react';
import { BaseUrl } from './config';

class CheckIfAuth extends React.Component {
  componentWillMount() {
    fetch(`${BaseUrl}/auth/isAuth`)
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        } else {
          localStorage.setItem('auth', true);
          window.location.href = '/';
        }
      })
      .catch(error => {
        console.error('Error:', error)
      });
  }

  render() {
    return (
      <div></div>
    )
  };
}

export default CheckIfAuth;
