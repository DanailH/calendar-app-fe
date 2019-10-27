import React from 'react';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PeopleIcon from '@material-ui/icons/People';
import UserService from '../../services/account.service';
// import './style.scss';

// const styles = {
// 	root: {
// 		height: 100,
// 	},
// 	menu: {
// 		width: '200px',
// 		border: '1px solid #d9d9d9',
// 		boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04), -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04)',
// 	},
// 	menuItem: {
// 		fontSize: '0.9rem',
// 	},
// 	menuIcon: {
// 		marginRight: '8px',
// 	}
// };
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

	toggleShareMenu = (event) => {
		this.setState({
			anchorEl: event.currentTarget
		})
	}

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		// const id = open ? 'simple-popover' : undefined;

		return (
			<div className="d-flex account-container">
				<Button variant="outlined" size="small" className="share-btn" onClick={this.toggleShareMenu}>
					<PeopleIcon />
					Share
         </Button>
				<Popover
					// id={id}
					open={Boolean(this.state.anchorEl)}
					anchorEl={this.state.anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
				</Popover>
			</div>
		)
	}
}

export default Account;