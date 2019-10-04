import React from 'react';
import './style.scss';

class Logo extends React.Component {
	render() {
		return (
			<img src='./logo.png' alt="logo" className="img-container" />
		)
	}
}

export default Logo;