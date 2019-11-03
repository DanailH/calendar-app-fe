import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ErrorIcon from '@material-ui/icons/Error';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import Logo from '../Logo/Logo';
import UserGuide from '../userGuide/userGuide.js';
import SetHolidays from '../setHolidays/index';
import SetCountry from '../setCountry/index';
import './style.scss';

const drawerStyles = {
  root: {
    width: '100%',
  },
  drawer: {
    padding: '16px',
    marginLeft: '6%',
    width: '350px'
  },
  drawerHeaderBox: {
    borderBottom: '1px solid #e6e6e6',
    paddingBottom: '8px',
    marginBottom: '16px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  drawerHeader: {
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  closeBtn: {
    '&:hover': {
      background: 'transparent'
    }
  },
  closeBtnIcon: {
    fontSize: '1rem',
  }
};

class Navigation extends Component {
  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });
  };

  openNavDrawer = () => {
    this.setState({
      isDrawerOpen: true,
    });
  }

  render() {
    const isNewUser = this.props.user && this.props.user.isNewUser
    const userName = this.props.user && this.props.user.firstName
    const showErrorIcon = this.props.count === 0 || this.props.country === undefined
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static" className="navigation-container">
          <Toolbar className="toolbar">
            <Link to="/">
              <Logo />
            </Link>
            <IconButton
              className="dashboard-btn"
              aria-label="home button"
              component={Link} to="/"
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              color="inherit"
            >
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={showErrorIcon && <ErrorIcon />}
              >
                <DateRangeIcon />
              </Badge>
            </IconButton>
            <IconButton
              className="dashboard-btn"
              aria-label="open dashboard"
              component={Link} to="/dashboard"
              color="inherit"
            >
              <DashboardIcon />
            </IconButton>

            <Drawer
              classes={{
                paper: classes.drawer,
              }}
              open={this.state.isDrawerOpen}
              ModalProps={{ onBackdropClick: this.toggleDrawer, onEscapeKeyDown: this.toggleDrawer }}
            >
              <div className="navigation-box">
                <div className={`d-flex ${clsx(classes.drawerHeaderBox)}`}>
                  <span className={clsx(classes.drawerHeader)}>Setting up</span>
                  <IconButton
                    aria-label="close drawer"
                    onClick={this.toggleDrawer}
                    color="inherit"
                    className={clsx(classes.closeBtn)}
                  >
                    <CloseIcon className={clsx(classes.closeBtnIcon)} />
                  </IconButton>
                </div>
                {this.props.count === 0 && (
                  <div className="missing-user-info">
                    Oh! The total number of yearly vacation days is missing.
                    Please fill in the number below so you can start planning.
                  </div>
                )}
                <SetHolidays count={this.props.count} setHolidays={this.props.setHoliday} />
                {this.props.country === '' && (
                  <Fragment>
                    <Divider />
                    <div className="missing-user-info">
                      You haven't selected your country yet!
                      Please select from the menu below so you can start planning and see all public holidays of your country.
                    </div>
                  </Fragment>
                )}
                <SetCountry country={this.props.country} setCountry={this.props.setCountry} />
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
        {isNewUser && (
          <UserGuide openDrawer={this.openNavDrawer} userName={userName} />
        )}
      </Fragment>
    )
  }
}

export default withStyles(drawerStyles)(Navigation);
