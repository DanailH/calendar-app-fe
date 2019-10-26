import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Drawer from '@material-ui/core/Drawer';
import Logo from '../Logo/Logo';
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
	drawerHeader: {
		fontSize: '1.4rem',
		fontWeight: '600',
		borderBottom: '1px solid #e6e6e6',
		padding: '8px 0',
		marginBottom: '16px'
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

	render() {
		const { classes } = this.props;
		return (
			<AppBar position="static" className="navigation-container">
				<Toolbar className="toolbar">
					<Logo />
					<IconButton
						aria-label="open drawer"
						onClick={this.toggleDrawer}
						color="inherit"
					>
						<DateRangeIcon />
					</IconButton>
					<Drawer
						classes={{
							paper: classes.drawer,
						}}
						open={this.state.isDrawerOpen}
						ModalProps={{ onBackdropClick: this.toggleDrawer, onEscapeKeyDown: this.toggleDrawer }}
					>
						<div className="navigation-box">
							<div className={clsx(classes.drawerHeader)}>
								Setting up
							</div>
							<SetHolidays count={this.props.holidayCount} setHolidays={this.props.setHoliday} />
							<SetCountry country={this.props.country} setCountry={this.props.setCountry} />
						</div>
					</Drawer>
				</Toolbar>
			</AppBar>
		)
	}
}

export default withStyles(drawerStyles)(Navigation);
