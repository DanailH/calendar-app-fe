import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import UserService from '../../services/account.service';
import './style.scss';

class Account extends React.Component {
  state = {
    isAuth: true,
  }

  handleLogOut = () => {
    return UserService.logoutUser()
      .then(localStorage.removeItem('_id'))
      .then(() =>
        this.setState({ isAuth: false })
       )
  }

  setInitials() {
    if (this.props.user && this.props.user.firstName && this.props.user.lastName) {
      return `${this.props.user.firstName.charAt(0)}${this.props.user.lastName.charAt(0)}`;
    }

    return 'JD';
  }

  render() {
    if (!this.state.isAuth) {
      return <Redirect to='/' />
    }
    return (
      <div className="d-flex account-container">
        <Avatar>{this.setInitials()}</Avatar>
        <Button variant="outlined" size="small" className="account-menu" onClick={this.handleLogOut}>
          Log out
              </Button>
      </div>
    )
  }
}

export default Account;