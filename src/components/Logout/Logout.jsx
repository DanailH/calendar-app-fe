import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import './style.scss';

class Logout extends React.Component {
  state = {
    isAuth: true,
  }

  componentDidMount() {
    fetch(`/users/user?userId=${this.props.userId}`)
      .then(res => res.json())
      .then(res => this.setState({
        user: res
      }))
  }

  handleLogOut = () => {
    fetch('/auth/logout')
      .then(localStorage.removeItem('_id'))
      .then(this.setState({ isAuth: false }))
      .catch(error => console.error('Error:', error));
  }

  setInitials() {
    if (this.state.user && this.state.user.firstName && this.state.user.lastName) {
      return `${this.state.user.firstName.charAt(0)}${this.state.user.lastName.charAt(0)}`;
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

export default Logout;