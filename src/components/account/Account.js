import React from 'react';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserService from '../../services/account.service';
import ShareCalendar from '../shareCalendar/ShareCalendar';
import './style.scss';

const styles = {
  root: {
    height: 100,
  },
  menu: {
    width: '200px',
    border: '1px solid #d9d9d9',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04), -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04)',
  },
  menuItem: {
    fontSize: '0.9rem',
  },
  menuIcon: {
    marginRight: '8px',
  }
};
class Account extends React.Component {
  state = {
    isAuth: true,
    anchorEl: null
  }

  handleLogOut = () => {
    return UserService.logoutUser()
      .then(localStorage.removeItem('_id'))
      .then(() =>
        this.setState({ isAuth: false })
      )
  }

  toggleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setInitials() {
    if (this.props.user && this.props.user.firstName && this.props.user.lastName) {
      return `${this.props.user.firstName.charAt(0)}${this.props.user.lastName.charAt(0)}`;
    }

    return 'JD';
  }

  render() {
    const { classes } = this.props;
    if (!this.state.isAuth) {
      return <Redirect to='/' />
    }
    return (
      <div className="d-flex account-container">
        <ShareCalendar/>
        <Avatar onClick={this.toggleMenu}>{this.setInitials()}</Avatar>
        <Menu
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          PopoverClasses={{
            paper: classes.menu
          }}
        >
          <MenuItem
            onClick={this.handleLogOut}
            className={clsx(classes.menuItem)}>
            <ExitToAppIcon className={clsx(classes.menuIcon)} />
            Log out
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(Account);