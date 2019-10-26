import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Drawer from '@material-ui/core/Drawer';
import Logo from '../Logo/Logo';
import SetHolidays from '../setHolidays/index';
import SetCountry from '../setCountry/index';
import './style.scss';

class Navigation extends React.Component {
	state = {
		isSnackBarOpen: false
	}

	// componentDidUpdate(nextProps) {
	// }

	render() {
		return (
			<AppBar position="static" className="menu-container">
				<Toolbar className="toolbar">
					<Logo />
					<IconButton
						aria-label="open drawer"
						// onClick={toggleDrawer('left', true)}
						color="inherit"
					>
						<DateRangeIcon />
					</IconButton>
					<Drawer
						// open={state.left}
						// onClose={toggleDrawer('left', false)}
						// onOpen={toggleDrawer('left', true)}
					>
					</Drawer>
					<div className="menu-box">
						<SetHolidays count={this.props.holidayCount} setHolidays={this.props.setHolidays} />
						<SetCountry country={this.props.country} setCountry={this.props.setCountry} />
					</div>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Navigation;
