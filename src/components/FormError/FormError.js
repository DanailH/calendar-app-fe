import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import './style.scss';

const registerError = 'All fields required, please try again.';
const loginError = 'Incorrect username or password.';

class FormError extends React.Component {
	render() {
		return (
			<div className="error-container">
				<ErrorIcon />
				<span>
					{this.props.registerError && registerError}
					{this.props.loginError && loginError}
				</span>
			</div>
		)
	}
}

export default FormError;
