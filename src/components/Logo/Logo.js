import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './style.scss';

class Logo extends React.Component {
	render() {
		return (
			<Box className="logo-container">
				<img src='./logo.png' alt="logo" className="img-container" />
				<Typography variant="h5">
					FOIZ
      	</Typography>
			</Box>
		)
	}
}

export default Logo;