import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import './style.scss';

class Logout extends React.Component {
	state = {
		isAuth: true,
	}

	handleLogOut = () => {
		fetch('/auth/logout')
			.then(localStorage.removeItem('_id'))
			.then(this.setState({ isAuth: false }))
			.catch(error => console.error('Error:', error));
	}

	render() {
		if (!this.state.isAuth) {
			return <Redirect to='/' />
		}
		return (
			<div className="d-flex account-container">
				<Avatar>DH</Avatar>
				<Button variant="outlined" size="small" className="account-menu" onClick={this.handleLogOut}>
					Log out
              </Button>
			</div>
		)
	}
}

export default Logout;